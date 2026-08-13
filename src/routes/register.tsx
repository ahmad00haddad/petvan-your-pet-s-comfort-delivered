import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "../lib/store";
import { registerUserFn } from "../api/auth";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUserId = useAppStore((state) => state.setUserId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await registerUserFn({ data: { name, email, password } });
      setUserId(user.id);
      navigate({ to: "/profile" });
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-primary">Create an account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Join PetVan today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && <div className="text-sm text-red-500 text-center">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
