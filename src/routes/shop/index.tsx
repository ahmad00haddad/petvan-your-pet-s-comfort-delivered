import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProductsFn } from "../../server/shop";
import { useAppStore } from "../../lib/store";
import { ShoppingCart, Utensils, Wrench, Gamepad2, Plus } from "lucide-react";

export const Route = createFileRoute("/shop/")({
  component: Shop,
});

const cats = [
  { id: "Food", icon: Utensils, label: "Food" },
  { id: "Tools", icon: Wrench, label: "Tools" },
  { id: "Games", icon: Gamepad2, label: "Games" },
];

function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const addToCart = useAppStore(state => state.addToCart);
  const cart = useAppStore(state => state.cart);
  
  useEffect(() => {
    getProductsFn().then(setProducts);
  }, []);

  const filtered = filter ? products.filter(p => p.category === filter) : products;

  return (
    <div className="mx-auto max-w-6xl p-5 py-10 sm:p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground">← Home</Link>
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
            className={`group grid size-24 place-items-center rounded-3xl shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 ${filter === c.id ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border'}`}
          >
            <c.icon className="size-8" />
            <span className="text-xs font-bold mt-1">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(p => (
          <article
            key={p.id}
            className="group relative overflow-hidden rounded-3xl bg-card p-5 flex flex-col text-start shadow-[var(--shadow-card)] ring-1 ring-border transition-transform hover:-translate-y-1"
          >
            <div className="grid h-40 place-items-center rounded-2xl bg-secondary mb-4 overflow-hidden">
              {p.image ? (
                <img src={p.image} alt={p.name} className="h-full w-full object-cover mix-blend-multiply" />
              ) : (
                <Utensils className="size-10 text-primary/70" />
              )}
            </div>
            <h3 className="font-display text-lg font-bold line-clamp-2">{p.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2 flex-grow">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-lg font-bold">
                {p.price.toFixed(2)} JOD
              </span>
              <button
                onClick={() => addToCart({ productId: p.id, name: p.name, price: p.price, quantity: 1, image: p.image })}
                className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110 active:scale-95"
              >
                <Plus className="size-5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
