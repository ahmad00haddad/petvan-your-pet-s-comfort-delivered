import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# 1. Update utils.ts with vibrate function
utils = rd('src/lib/utils.ts')
if "export function vibrate" not in utils:
    utils += """

export function vibrate(pattern: number | number[] = 50) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}
"""
    rw('src/lib/utils.ts', utils)


# 2. Add Lenis to __root.tsx
root = rd('src/routes/__root.tsx')
if "import Lenis" not in root:
    root = root.replace(
        'import { useEffect, useState, type ReactNode } from "react";',
        'import { useEffect, useState, type ReactNode } from "react";\nimport Lenis from "@studio-freight/lenis";\nimport { MessageCircle } from "lucide-react";'
    )
    
    lenis_code = """
  // Phase 1: Lenis Smooth Scroll & Battery Saver
  useEffect(() => {
    let lenis: Lenis | null = null;
    
    // Battery saver check
    let useSmooth = true;
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2 && !battery.charging) {
          useSmooth = false; // Disable heavy animations on low battery
          document.body.classList.add('low-battery');
        } else {
          initLenis();
        }
      }).catch(() => initLenis());
    } else {
      initLenis();
    }

    function initLenis() {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);
"""
    root = root.replace(
        '  const [scrolled, setScrolled] = useState(false);',
        '  const [scrolled, setScrolled] = useState(false);\n' + lenis_code
    )
    
    # Smart Floating WhatsApp
    floating_wa = """
      {/* Floating Smart WhatsApp */}
      <a
        href="https://wa.me/962799256345"
        target="_blank"
        rel="noreferrer"
        className={`fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white p-3 rounded-full font-bold transition-all duration-500 shadow-lg shadow-[#25D366]/20 hover:scale-110 hover:shadow-xl ${
          scrolled && !showScrollTop ? "w-auto px-5" : "w-12 h-12 justify-center"
        }`}
      >
        <MessageCircle className="size-6 shrink-0" />
        <span className={`overflow-hidden transition-all duration-500 whitespace-nowrap ${scrolled && !showScrollTop ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0 hidden"}`}>
          {lang === "ar" ? "تواصل معنا" : "Contact Us"}
        </span>
      </a>
"""
    root = root.replace(
        '      {/* Global Footer */}',
        floating_wa + '\n      {/* Global Footer */}'
    )
    rw('src/routes/__root.tsx', root)


# 3. Haptic Pulse and Sticky Bottom Bar in Cart
cart = rd('src/routes/shop/cart.tsx')
cart = cart.replace('import { ShoppingBag', 'import { vibrate } from "../../lib/utils";\nimport { ShoppingBag')

# Make summary sticky on mobile
cart = cart.replace(
    '          {/* Order Summary */}\n          <div className="bg-card p-6 rounded-3xl border border-border h-fit">',
    '          {/* Order Summary */}\n          <div className="bg-card p-6 rounded-3xl border border-border h-fit sticky bottom-0 z-40 sm:top-24 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] sm:shadow-none">'
)

# Add vibration to buttons
cart = cart.replace(
    'onClick={() => updateQuantity(item.id, item.quantity - 1)}',
    'onClick={() => { vibrate(30); updateQuantity(item.id, item.quantity - 1); }}'
)
cart = cart.replace(
    'onClick={() => updateQuantity(item.id, item.quantity + 1)}',
    'onClick={() => { vibrate(30); updateQuantity(item.id, item.quantity + 1); }}'
)
cart = cart.replace(
    'onClick={() => removeItem(item.id)}',
    'onClick={() => { vibrate([30, 50, 30]); removeItem(item.id); }}'
)
cart = cart.replace(
    'onClick={handleCheckout}',
    'onClick={() => { vibrate(50); handleCheckout(); }}'
)

rw('src/routes/shop/cart.tsx', cart)

# 4. Haptic Pulse and Sticky Bottom Bar in Book
book = rd('src/routes/services/book.tsx')
book = book.replace('import { ArrowLeft', 'import { vibrate } from "../../lib/utils";\nimport { ArrowLeft')

# Sticky bottom bar for Booking total
book = book.replace(
    '          {/* Right Column: Order Summary & Form */}\n          <div className="space-y-8">',
    '          {/* Right Column: Order Summary & Form */}\n          <div className="space-y-8 sticky bottom-0 z-40 sm:static bg-background/95 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none p-4 sm:p-0 -mx-4 sm:mx-0 border-t border-border sm:border-none shadow-[0_-10px_40px_rgba(0,0,0,0.2)] sm:shadow-none">'
)
# Add vibration to service selection
book = book.replace(
    'onClick={() => setService(s.id)}',
    'onClick={() => { vibrate(40); setService(s.id); }}'
)
book = book.replace(
    'onClick={handleSubmit}',
    'onClick={(e) => { vibrate(60); handleSubmit(e); }}'
)
rw('src/routes/services/book.tsx', book)

print("Phase 1 scripts applied successfully.")