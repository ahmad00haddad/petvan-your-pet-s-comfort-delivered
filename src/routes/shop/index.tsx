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
    <div className="mx-auto max-w-6xl p-5 py-10 sm:p-8 min-h-screen">
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
            className={`group grid size-24 place-items-center rounded-3xl shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 ${filter === c.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border"}`}
          >
            <c.icon className="size-8" />
            <span className="text-xs font-bold mt-1">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 text-primary">
            <Loader2 className="size-10 animate-spin" />
            <p className="font-bold animate-pulse">Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center p-10 text-muted-foreground">
            No products found.
          </div>
        ) : (
          filtered.map((p, i) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-3xl bg-card p-5 flex flex-col text-start shadow-[var(--shadow-card)] ring-1 ring-border transition-transform hover:-translate-y-1"
            >
              {/* Visual Badges */}
              {i === 0 && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold text-white shadow-sm">
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
