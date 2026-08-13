import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppStore } from "../lib/store";
import { getUserFn } from "../api/auth";
import { getMyPetsFn, deletePetFn } from "../api/pets";
import { getMyOrdersFn } from "../api/orders";
import { LogOut, Plus, PawPrint, Package, Calendar, Trash2, Star, Loader2 } from "lucide-react";
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
      setPets(pets.filter((p) => p.id !== petId));
      toast.success("Pet removed successfully");
    } catch {
      toast.error("Failed to remove pet");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-primary">
        <Loader2 className="size-10 animate-spin" />
        <p className="font-bold animate-pulse">Loading profile...</p>
      </div>
    );
  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl p-5 py-10 sm:p-12 min-h-screen text-center">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <div className="size-40 rounded-full border-4 border-foreground/20 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
            alt="User Avatar"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-1 text-[#FFC107]">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-5 fill-current" />
          ))}
          <Star className="size-5" />
        </div>

        <p className="mt-3 text-xs text-muted-foreground uppercase tracking-widest">customer</p>
        <div className="flex items-center justify-center gap-3 mt-1">
          <h1 className="font-display text-2xl font-bold">{user.name}</h1>
          <button
            onClick={() => setUserId(null)}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Settings / Logout"
          >
            <LogOut className="size-5" />
          </button>
        </div>

        <Link
          to="/pets/add"
          className="mt-6 inline-block rounded-full bg-[#FFC107] px-8 py-2 text-xs font-bold text-[#1a1a1a] transition-transform hover:scale-105 uppercase tracking-wider"
        >
          Add Pet
        </Link>
      </div>

      {/* Pets */}
      <div className="mt-16 flex justify-center gap-8 sm:gap-12">
        {pets.length === 0 ? (
          <p className="text-muted-foreground text-sm">No pets added yet.</p>
        ) : (
          pets.map((pet) => (
            <Link
              key={pet.id}
              to="/pets/$petId"
              params={{ petId: String(pet.id) }}
              className="group flex flex-col items-center"
            >
              <div className="size-28 sm:size-32 rounded-full border-4 border-foreground/20 overflow-hidden mb-4 transition-transform group-hover:scale-105 group-hover:border-[#FFC107] relative">
                {pet.image ? (
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-4xl">
                    <PawPrint />
                  </div>
                )}
              </div>
              <h3 className="font-display font-bold uppercase tracking-widest">{pet.name}</h3>
            </Link>
          ))
        )}
      </div>

      <hr className="my-12 border-[#2a2a2a] max-w-xl mx-auto" />

      {/* Photo Section */}
      <div>
        <h2 className="text-muted-foreground font-display mb-8 text-sm flex justify-center items-center gap-2">
          Photo <Plus className="size-4" />
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto">
          {[
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5",
            "https://images.unsplash.com/photo-1614989647360-1e523f380fa0",
            "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8",
            "https://images.unsplash.com/photo-1552053831-71594a27632d",
            "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
          ].map((src, i) => (
            <div key={i} className="aspect-square bg-secondary overflow-hidden">
              <img
                src={`${src}?w=400&h=400&fit=crop`}
                alt={`Pet photo ${i}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <button className="mt-12 rounded-full bg-[#FFC107] px-10 py-2.5 text-xs font-bold text-[#1a1a1a] transition-transform hover:scale-105 uppercase tracking-widest">
          View More
        </button>
      </div>
    </div>
  );
}
