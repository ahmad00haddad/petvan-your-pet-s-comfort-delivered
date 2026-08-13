import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppStore } from "../lib/store";
import { getUserFn } from "../api/auth";
import { getMyPetsFn, deletePetFn } from "../api/pets";
import { getMyOrdersFn } from "../api/orders";
import { LogOut, Plus, PawPrint, Trash2, Package, Calendar, Loader2 } from "lucide-react";
import { copy } from "../lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const userId = useAppStore((state) => state.userId);
  const setUserId = useAppStore((state) => state.setUserId);
  const navigate = useNavigate();
  
  const lang = useAppStore((state) => state.lang);
  const t = copy[lang];
  
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate({ to: "/login" });
      return;
    }
    
    Promise.all([
      getUserFn({ data: userId }),
      getMyPetsFn({ data: userId }),
      getMyOrdersFn({ data: userId }),
    ]).then(([u, p, o]) => {
      setUser(u);
      setPets(p);
      setOrders(o);
      setLoading(false);
    });
  }, [userId, navigate]);

  const handleDeletePet = async (petId: string) => {
    try {
      await deletePetFn({ data: { userId: userId!, petId } });
      setPets(pets.filter(p => p.id !== petId));
      toast.success("Pet removed successfully");
    } catch {
      toast.error("Failed to remove pet");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-primary">
      <Loader2 className="size-10 animate-spin" />
      <p className="font-bold animate-pulse">Loading profile...</p>
    </div>
  );
  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl p-5 py-10 sm:p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground">← {t.home}</Link>
          <h1 className="font-display text-4xl font-extrabold text-primary">{t.profile}</h1>
        </div>
        <button 
          onClick={() => {
            setUserId(null);
            navigate({ to: "/" });
          }}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="col-span-1 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] h-fit">
          <div className="grid size-24 place-items-center rounded-full bg-secondary mx-auto text-3xl font-bold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-center font-display text-xl font-bold">{user.name}</h2>
          <p className="text-center text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div className="col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">My Pets</h2>
            <Link 
              to="/pets/add" 
              className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              <Plus className="size-4" />
              Add Pet
            </Link>
          </div>

          {pets.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
              <span className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-secondary text-primary">
                <PawPrint className="size-10" />
              </span>
              <h3 className="font-display text-2xl font-bold mb-2">No pets added yet</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Start by adding your first pet to keep track of their medical records, salon visits, and more!
              </p>
              <Link 
                to="/pets/add" 
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 animate-pulse"
              >
                <Plus className="size-5" />
                Add Your First Pet
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {pets.map(pet => (
                <Link key={pet.id} to="/pets/$petId" params={{ petId: String(pet.id) }} className="group relative rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] flex items-center gap-4 hover:border-primary transition-colors">
                  <div className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-xl overflow-hidden">
                    {pet.image ? <img src={pet.image} alt={pet.name} className="w-full h-full object-cover mix-blend-multiply" /> : (pet.type === 'Cats' || pet.type === 'Cat' ? '🐱' : pet.type === 'Dogs' || pet.type === 'Dog' ? '🐶' : pet.type === 'Birds' || pet.type === 'Bird' ? '🦜' : '🐟')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.breed || pet.type}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeletePet(pet.id);
                    }}
                    className="absolute top-3 end-3 rounded-full bg-destructive/10 p-2 text-destructive opacity-0 transition-all hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100"
                    aria-label={t.deletePet}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/* Orders Section */}
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-6">{t.orderHistory}</h2>
            
            {orders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center shadow-sm">
                <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-secondary text-muted-foreground">
                  <Package className="size-8" />
                </span>
                <p className="text-muted-foreground">No past orders or bookings found.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map(order => (
                  <div key={order.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`grid size-12 place-items-center rounded-full ${order.type === 'SERVICE' ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground'}`}>
                        {order.type === 'SERVICE' ? <Calendar className="size-6" /> : <Package className="size-6" />}
                      </div>
                      <div>
                        <h3 className="font-display font-bold">
                          {order.type === 'SERVICE' ? order.serviceType : 'Shop Purchase'}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Order #{order.id} • {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-bold">{order.total.toFixed(2)} JD</p>
                      {order.type === 'SERVICE' && (
                        <Link to="/services/tracking/$orderId" params={{ orderId: String(order.id) }} className="text-xs text-primary hover:underline mt-1 inline-block">
                          Track Status
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
