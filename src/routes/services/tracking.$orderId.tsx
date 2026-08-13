import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getOrderFn } from "../../api/services";
import { MapPin, Star, Clock, Home, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/services/tracking/$orderId")({
  component: Tracking,
});

function Tracking() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    getOrderFn({ data: orderId }).then((data) => {
      setOrder(data);
      if (data?.eta) {
        const calculateTimeLeft = () => {
          const diff = new Date(data.eta).getTime() - new Date().getTime();
          if (diff <= 0) {
            setTimeLeft("Arrived");
          } else {
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${m}m ${s}s`);
          }
        };
        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
      }
      setLoading(false);
    });
  }, [orderId]);

  if (loading && !order)
    return (
      <div className="p-10 text-center min-h-screen flex items-center justify-center">
        Loading tracker...
      </div>
    );
  if (!order)
    return (
      <div className="p-10 text-center min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl p-5 py-10 sm:p-8 min-h-screen flex flex-col items-center">
      <div className="w-full mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>

      <div className="w-full rounded-[2.5rem] border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground mb-6 shadow-[var(--shadow-gold)]">
          <Clock className="size-8" />
        </span>

        <p className="font-display font-bold text-xl">{order.serviceType} Booking Confirmed</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Order #{order.id.slice(-6).toUpperCase()}
        </p>

        <div className="my-10">
          <p className="text-sm text-muted-foreground mb-2">Estimated Arrival Time</p>
          <h3 className="font-display text-5xl font-extrabold text-primary tabular-nums tracking-tighter">
            {timeLeft}
          </h3>
        </div>

        <div className="relative mt-8 h-64 overflow-hidden rounded-3xl bg-secondary w-full max-w-xl mx-auto border border-border/50">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:26px_26px]" />

          {/* Route Line */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M 20 80 Q 50 20 80 20"
              fill="none"
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth="3"
              strokeDasharray="6,6"
              className="animate-[dash_20s_linear_infinite]"
            />
          </svg>
          <style>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>

          {/* Home marker */}
          <span className="absolute right-[20%] top-[20%] grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card border-2 border-primary text-primary z-10 shadow-lg">
            <Home className="size-5" />
          </span>

          {/* Van marker */}
          <span className="absolute left-[30%] top-[60%] grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)] z-20 animate-bounce">
            <MapPin className="size-6" />
          </span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 rounded-2xl bg-secondary/50 p-6">
          <span className="grid size-14 place-items-center rounded-full bg-primary/20 text-lg font-bold text-primary">
            {order.driverName
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")}
          </span>
          <div className="text-center sm:text-start">
            <p className="text-lg">
              <span className="font-bold">{order.driverName}</span> is on the way!
            </p>
            <span className="flex items-center justify-center sm:justify-start mt-2 text-primary gap-1">
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
              <Star className="size-4 fill-current opacity-50" />
              <span className="text-sm font-bold ml-2 text-foreground">4.8</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
