import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppStore } from "../lib/store";
import { getUserFn } from "../api/auth";
import { getMyPetsFn } from "../api/pets";
import { LogOut, Plus, PawPrint } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const userId = useAppStore((state) => state.userId);
  const setUserId = useAppStore((state) => state.setUserId);
  const navigate = useNavigate();
  
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate({ to: "/login" });
      return;
    }
    
    Promise.all([
      getUserFn({ data: userId }),
      getMyPetsFn({ data: userId })
    ]).then(([u, p]) => {
      setUser(u);
      setPets(p);
      setLoading(false);
    });
  }, [userId, navigate]);

  if (loading) return <div className="p-8 text-center min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl p-5 py-10 sm:p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground">← Home</Link>
          <h1 className="font-display text-4xl font-extrabold text-primary">My Profile</h1>
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
                <div key={pet.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-secondary text-xl">
                    {pet.type === 'Cat' ? '🐱' : pet.type === 'Dog' ? '🐶' : pet.type === 'Bird' ? '🦜' : '🐟'}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.gender} • {pet.type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
