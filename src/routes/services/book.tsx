import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "../../lib/store";
import { bookServiceFn } from "../../server/services";
import { ArrowLeft, Stethoscope, Home, Scissors } from "lucide-react";

export const Route = createFileRoute("/services/book")({
  component: BookService,
});

const services = [
  { id: "MEDICAL", name: "Medical Care", desc: "Vet checkup & treatment at home", price: 25.00, icon: Stethoscope },
  { id: "HOTEL", name: "Pet Hotel", desc: "Boarding pickup via van", price: 20.00, icon: Home },
  { id: "SALON", name: "Pet Salon", desc: "Grooming & bathing", price: 15.00, icon: Scissors },
];

function BookService() {
  const [selected, setSelected] = useState(services[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = useAppStore((state) => state.userId);

  const handleBook = async () => {
    if (!userId) {
      navigate({ to: "/login" });
      return;
    }
    setLoading(true);
    try {
      const order = await bookServiceFn({ 
        data: { userId, serviceType: selected.id, total: selected.price } 
      });
      navigate({ to: `/services/tracking/${order.id}` });
    } catch (err) {
      console.error(err);
      alert("Booking failed");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-5 py-10 sm:p-8 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>
      
      <h1 className="font-display text-4xl font-extrabold text-primary mb-2">Book a Service</h1>
      <p className="text-muted-foreground mb-10">Select a mobile service to deliver comfort to your door.</p>

      <div className="grid gap-6 sm:grid-cols-3 mb-12">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s)}
            className={`flex flex-col items-center text-center p-6 rounded-3xl border transition-all ${
              selected.id === s.id 
                ? 'border-primary ring-2 ring-primary ring-offset-2 bg-primary/5 shadow-[var(--shadow-gold)]' 
                : 'border-border bg-card hover:border-primary/50 shadow-[var(--shadow-card)]'
            }`}
          >
            <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground mb-4">
              <s.icon className="size-6" />
            </span>
            <h3 className="font-display text-lg font-bold">{s.name}</h3>
            <p className="mt-2 text-xs text-muted-foreground flex-grow">{s.desc}</p>
            <span className="mt-4 font-bold text-primary">{s.price.toFixed(2)} JOD</span>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-xl font-bold">Total: {selected.price.toFixed(2)} JOD</h2>
          <p className="text-sm text-muted-foreground mt-1">Our mobile van will arrive at your registered location.</p>
        </div>
        <button
          onClick={handleBook}
          disabled={loading}
          className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
        >
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
