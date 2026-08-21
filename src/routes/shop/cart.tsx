import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "../../lib/store";
import { checkoutFn } from "../../api/shop";
import { useState } from "react";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { copy } from "../../lib/i18n";
import * as Dialog from "@radix-ui/react-dialog";

export const Route = createFileRoute("/shop/cart")({
  component: Cart,
});

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, userId } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
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
          items: cart.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
          total,
        },
      });
      setSuccess(true);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-2xl p-5 py-20 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
          ✓
        </div>
        <h1 className="font-display text-4xl font-extrabold text-foreground mb-4">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your items will be delivered soon.
        </p>
        <Link
          to="/shop"
          className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:scale-105 transition-transform"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-5 py-10 sm:p-8 min-h-screen">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to Shop
      </Link>

      <h1 className="font-display text-4xl font-extrabold text-primary mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Link
            to="/shop"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
          >
            {t.browseProducts}
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-20 rounded-xl object-cover mix-blend-multiply bg-secondary"
                  />
                ) : (
                  <div className="size-20 rounded-xl bg-secondary" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold line-clamp-1">{item.name}</h3>
                  <div className="text-primary font-bold">{item.price.toFixed(2)} JOD</div>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="size-6 rounded bg-secondary flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="size-6 rounded bg-secondary flex items-center justify-center font-bold"
                    >
                      +
                    </button>
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
            <h2 className="font-display text-xl font-bold mb-4">{t.orderSummary}</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>{t.subtotal}</span>
                <span>{total.toFixed(2)} JOD</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t.delivery}</span>
                <span>2.00 JOD</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>{t.total}</span>
                <span>{(total + 2).toFixed(2)} JOD</span>
              </div>
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  disabled={loading}
                  className="w-full rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? t.processing : `Pay Now (${(total + 2).toFixed(2)} JOD)`}
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
                  <div className="flex flex-col items-center text-center">
                    <span className="grid size-16 place-items-center rounded-full bg-primary/20 text-primary mb-4">
                      <ShoppingBag className="size-8" />
                    </span>
                    <Dialog.Title className="font-display text-2xl font-bold">
                      Checkout Details
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-muted-foreground mb-6">
                      {t.enterDelivery} <strong>{cart.length}</strong> {t.itemsWord}.
                    </Dialog.Description>

                    <div className="w-full text-start mb-6 space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">{t.deliveryAddress}</label>
                        <input 
                          type="text" 
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. Mecca St, Amman" 
                          className="w-full h-11 rounded-md border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">{t.phoneNumber}</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 079xxxxxxx" 
                          className="w-full h-11 rounded-md border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-muted-foreground">{t.paymentMethod}</span>
                          <span className="font-bold">{t.cashOnDelivery}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">{t.totalToPay}</span>
                          <span className="font-bold text-xl text-primary">{(total + 2).toFixed(2)} JOD</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full gap-3">
                      <Dialog.Close asChild>
                        <button className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-bold transition-colors hover:bg-secondary">
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        onClick={handleCheckout}
                        disabled={!address || !phone || loading}
                        className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                      >
                        {loading ? t.processing : t.confirmPayment}
                      </button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      )}
    </div>
  );
}
