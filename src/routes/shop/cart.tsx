import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "../../lib/store";
import { checkoutFn } from "../../server/shop";
import { useState } from "react";
import { Trash2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/shop/cart")({
  component: Cart,
});

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, userId } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!userId) {
      navigate({ to: "/login" });
      return;
    }
    setLoading(true);
    try {
      await checkoutFn({ 
        data: { 
          userId, 
          items: cart.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price })),
          total 
        } 
      });
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-2xl p-5 py-20 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
        <h1 className="font-display text-4xl font-extrabold text-foreground mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">Thank you for your purchase. Your items will be delivered soon.</p>
        <Link to="/shop" className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:scale-105 transition-transform">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-5 py-10 sm:p-8 min-h-screen">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="size-4" />
        Back to Shop
      </Link>

      <h1 className="font-display text-4xl font-extrabold text-primary mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Link to="/shop" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.productId} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="size-20 rounded-xl object-cover mix-blend-multiply bg-secondary" />
                ) : (
                  <div className="size-20 rounded-xl bg-secondary" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold line-clamp-1">{item.name}</h3>
                  <div className="text-primary font-bold">{item.price.toFixed(2)} JOD</div>
                  <div className="mt-2 flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} className="size-6 rounded bg-secondary flex items-center justify-center font-bold">-</button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="size-6 rounded bg-secondary flex items-center justify-center font-bold">+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] h-fit">
            <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{total.toFixed(2)} JOD</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span>2.00 JOD</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{(total + 2).toFixed(2)} JOD</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Processing..." : "Checkout securely"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
