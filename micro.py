import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# 1. Profile
prof = rd('src/routes/profile.tsx')
prof = prof.replace(
    'const t = copy[lang];',
    """const t = copy[lang];
  
  // Micro-interaction: Time of Day Greeting
  const hour = new Date().getHours();
  const greetingEn = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const greetingAr = hour < 12 ? "صباح الخير" : "مساء الخير";
  const greeting = lang === "ar" ? greetingAr : greetingEn;
"""
)
prof = prof.replace(
    '<h1 className="font-display text-4xl font-extrabold text-foreground mb-1">{user.name}</h1>',
    '<h1 className="font-display text-4xl font-extrabold text-foreground mb-1">{greeting}, {user.name.split(" ")[0]}!</h1>'
)
rw('src/routes/profile.tsx', prof)

# 2. petId
pet = rd('src/routes/pets/$petId.tsx')
pet = pet.replace('import {', 'import { Check, ')
pet = pet.replace('  const [activeTab', '  const [copied, setCopied] = useState(false);\n  const [activeTab')
pet = pet.replace(
    'navigator.clipboard.writeText(window.location.href);\n      alert(lang === "ar" ? "تم نسخ الرابط!" : "Link copied to clipboard!");',
    'navigator.clipboard.writeText(window.location.href);\n      setCopied(true);\n      setTimeout(() => setCopied(false), 2000);'
)
pet = pet.replace(
    '<Share2 className="size-5" />',
    '{copied ? <Check className="size-5 text-green-500" /> : <Share2 className="size-5" />}'
)
rw('src/routes/pets/$petId.tsx', pet)

# 3. book
book = rd('src/routes/services/book.tsx')
book = book.replace(
    'import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, CreditCard, Stethoscope, Scissors } from "lucide-react";',
    'import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, CreditCard, Stethoscope, Scissors, Flame } from "lucide-react";'
)
book = book.replace(
    '''                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary">
                          <Icon className="size-5" />
                        </div>
                        <h3 className="font-bold font-display">{s.name}</h3>
                      </div>''',
    '''                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary">
                          <Icon className="size-5" />
                        </div>
                        <h3 className="font-bold font-display">{s.name}</h3>
                      </div>
                      {s.price === 50 && (
                        <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                          <Flame className="size-3" />
                          {lang === "ar" ? "طلب عالي!" : "High Demand!"}
                        </div>
                      )}'''
)
book = book.replace(
    'import { useNavigate, Link } from "@tanstack/react-router";',
    'import { useNavigate, Link } from "@tanstack/react-router";\nimport confetti from "canvas-confetti";'
)
book = book.replace(
    '      toast.success(lang === "ar" ? "تم حجز الموعد بنجاح!" : "Appointment booked successfully!");',
    '''      toast.success(lang === "ar" ? "تم حجز الموعد بنجاح!" : "Appointment booked successfully!");
      // Micro-interaction: Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffca28', '#ffffff', '#1a1a1a']
      });'''
)
rw('src/routes/services/book.tsx', book)

# 4. cart
cart = rd('src/routes/shop/cart.tsx')
cart = cart.replace(
    'import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard, Info } from "lucide-react";',
    'import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard, Info, MessageCircle } from "lucide-react";\nimport confetti from "canvas-confetti";'
)
cart = cart.replace(
    'toast.success(lang === "ar" ? "تم تأكيد الطلب بنجاح!" : "Order placed successfully!");',
    '''toast.success(lang === "ar" ? "تم تأكيد الطلب بنجاح!" : "Order placed successfully!");
      // Micro-interaction: Confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffca28', '#ffffff', '#1a1a1a']
      });'''
)
cart = cart.replace(
    '<p className="text-muted-foreground mt-2">{t.checkoutSuccessDesc}</p>',
    '''<p className="text-muted-foreground mt-2">{t.checkoutSuccessDesc}</p>
          <a href="https://wa.me/962799256345?text=Hello%2C%20I%20just%20placed%20an%20order%20on%20PetVan!" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/20">
            <MessageCircle className="size-5" />
            {lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
          </a>'''
)
rw('src/routes/shop/cart.tsx', cart)

print("Done")