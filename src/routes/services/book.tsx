import { Magnetic } from "../../components/Magnetic";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "../../lib/store";
import { copy } from "../../lib/i18n";
import { bookServiceFn } from "../../api/services";
import { ArrowLeft, Stethoscope, Home, Scissors, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";

export const Route = createFileRoute("/services/book")({
  component: BookService,
});

const services = [
  {
    id: "MEDICAL",
    name: "Medical Care",
    desc: "Vet checkup & treatment at home",
    price: 25.0,
    icon: Stethoscope,
  },
  { id: "HOTEL", name: "Pet Hotel", desc: "Boarding pickup via van", price: 20.0, icon: Home },
  { id: "SALON", name: "Pet Salon", desc: "Grooming & bathing", price: 15.0, icon: Scissors },
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
        data: { userId, serviceType: selected.id, total: selected.price },
      });
      toast.success("Booking confirmed successfully!");
      navigate({ to: "/services/tracking/$orderId", params: { orderId: String(order.id) } });
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-5 py-10 sm:p-8 min-h-screen">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <h1 className="font-display text-4xl font-extrabold text-primary mb-2">{t.bookService}</h1>
      <p className="text-muted-foreground mb-10">
          {t.bookServiceDesc}
        </p>

      <div className="grid gap-6 sm:grid-cols-3 mb-12">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s)}
            className={`flex flex-col items-center text-center p-6 rounded-3xl border transition-all ${
              selected.id === s.id
                ? "border-primary ring-2 ring-primary ring-offset-2 bg-primary/5 shadow-[var(--shadow-gold)]"
                : "border-border bg-card hover:border-primary/50 shadow-[var(--shadow-card)]"
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
          <p className="text-sm text-muted-foreground mt-1">
            Our mobile van will arrive at your registered location.
          </p>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              disabled={loading}
              className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
            >
              {loading ? "Confirming..." : "Confirm Booking"}
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
              <div className="flex flex-col items-center text-center">
                <span className="grid size-16 place-items-center rounded-full bg-primary/20 text-primary mb-4">
                  <AlertCircle className="size-8" />
                </span>
                <Dialog.Title className="font-display text-2xl font-bold">
                  Confirm Booking
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-muted-foreground mb-8">
                  Are you sure you want to book the <strong>{selected.name}</strong> service? A
                  mobile van will be dispatched to your location immediately.
                  <br />
                  <br />
                  <span className="font-bold text-foreground block text-lg">
                    Cost: {selected.price.toFixed(2)} JOD
                  </span>
                </Dialog.Description>

                <div className="flex w-full gap-3">
                  <Dialog.Close asChild>
                    <button className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-bold transition-colors hover:bg-secondary">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={handleBook}
                    className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
                  >
                    Yes, dispatch van
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
