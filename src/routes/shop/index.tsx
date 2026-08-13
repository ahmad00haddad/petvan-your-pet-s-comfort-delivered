import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProductsFn } from "../../api/shop";
import { useAppStore } from "../../lib/store";
import {
  ShoppingCart,
  Utensils,
  Wrench,
  Gamepad2,
  Plus,
  Loader2,
  Sparkles,
  Flame,
} from "lucide-react";

export const Route = createFileRoute("/shop/")({
  component: Shop,
});

const cats = [
  { id: "Food", icon: Utensils, label: "Food" },
  { id: "Tools", icon: Wrench, label: "Tools" },
  { id: "Games", icon: Gamepad2, label: "Games" },
];

function Shop() {
  const globalPetType = useAppStore((state) => state.globalPetType);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);

  useEffect(() => {
    getProductsFn().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // Filter first by category if chosen, otherwise by globalPetType
  const filtered = products.filter((p) => {
    if (filter) return p.category === filter;
    if (globalPetType) return p.targetPet === globalPetType;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl p-5 py-10 sm:p-8 min-h-screen animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            ← Home
          </Link>
          <h1 className="font-display text-4xl font-extrabold text-primary">Pet Shop</h1>
        </div>
        <Link
          to="/shop/cart"
          className="relative flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
        >
          <ShoppingCart className="size-5" />
          Cart
          {cart.length > 0 && (
            <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {cats.map((c) => (
          <button
            key={c.label}
            onClick={() => setFilter(filter === c.id ? null : c.id)}
            className={`group grid size-24 place-items-center rounded-3xl shadow-[var(--shadow-card)] transition-all hover:-translate-y-2 hover:glow-primary ${filter === c.id ? "bg-primary text-primary-foreground scale-105" : "glass-panel text-foreground border border-border"}`}
          >
            <c.icon className={`size-8 transition-colors ${filter === c.id ? "" : "group-hover:text-primary"}`} />
            <span className={`text-xs font-bold mt-1 transition-colors ${filter === c.id ? "" : "group-hover:text-primary"}`}>{c.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="group relative overflow-hidden rounded-3xl glass-panel p-5 flex flex-col h-[320px] shadow-[var(--shadow-card)] ring-1 ring-border">
              <div className="h-40 w-full rounded-2xl bg-secondary animate-pulse mb-4" />
              <div className="h-6 w-3/4 bg-secondary rounded animate-pulse mb-3" />
              <div className="h-3 w-full bg-secondary rounded animate-pulse mb-1" />
              <div className="h-3 w-4/5 bg-secondary rounded animate-pulse flex-grow" />
              <div className="mt-4 flex justify-between items-center">
                <div className="h-6 w-1/3 bg-secondary rounded animate-pulse" />
                <div className="size-10 rounded-full bg-secondary animate-pulse" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="grid size-24 place-items-center rounded-full bg-secondary text-muted-foreground mb-6">
              <ShoppingCart className="size-10 opacity-50" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">No items found</h3>
            <p className="text-muted-foreground max-w-sm mb-8">
              We couldn't find any products matching your current filters. Try selecting a different category.
            </p>
            <button 
              onClick={() => setFilter(null)}
              className="rounded-full bg-primary/10 text-primary px-6 py-2 text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filtered.map((p, i) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-3xl glass-panel p-5 flex flex-col text-start shadow-[var(--shadow-card)] ring-1 ring-border transition-all hover:-translate-y-2 hover:glow-primary"
            >
              {/* Visual Badges */}
              {i === 0 && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold text-primary-foreground shadow-sm">
                  <Flame className="size-3" />
                  Best Seller
                </div>
              )}
              {i === 2 && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground shadow-sm">
                  <Sparkles className="size-3" />
                  New Arrival
                </div>
              )}

              <div className="grid h-40 place-items-center rounded-2xl bg-secondary mb-4 overflow-hidden relative">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <Utensils className="size-10 text-primary/70 transition-transform duration-500 group-hover:scale-110" />
                )}
              </div>
              <h3 className="font-display text-lg font-bold line-clamp-2">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 flex-grow">
                {p.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-lg font-bold">{p.price.toFixed(2)} JOD</span>
                <button
                  onClick={() =>
                    addToCart({
                      productId: p.id,
                      name: p.name,
                      price: p.price,
                      quantity: 1,
                      image: p.image,
                    })
                  }
                  className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-110 active:scale-95"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
