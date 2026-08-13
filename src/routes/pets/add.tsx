import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "../../lib/store";
import { addPetFn } from "../../api/pets";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/pets/add")({
  component: AddPet,
});

function AddPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Cat");
  const [gender, setGender] = useState("M");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = useAppStore((state) => state.userId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      navigate({ to: "/login" });
      return;
    }

    setLoading(true);
    setError("");
    try {
      await addPetFn({ data: { userId, name, type, gender } });
      navigate({ to: "/profile" });
    } catch (err: any) {
      setError(err.message || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5 py-10 sm:p-8 min-h-screen">
      <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="size-4" />
        Back to Profile
      </Link>
      
      <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <h1 className="font-display text-3xl font-extrabold text-primary">Add a New Pet</h1>
        <p className="mt-2 text-sm text-muted-foreground">Fill in the details to add your pet to your profile.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && <div className="text-sm text-red-500">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="name">Pet Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
                placeholder="e.g. Bella"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium" htmlFor="type">Pet Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
                >
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
                  <option value="Bird">Bird</option>
                  <option value="Fish">Fish</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Adding..." : "Add Pet"}
          </button>
        </form>
      </div>
    </div>
  );
}
