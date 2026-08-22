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
""", 1
)
prof = prof.replace(
    '<h1 className="font-display text-4xl font-extrabold text-foreground mb-1">{user.name}</h1>',
    '<h1 className="font-display text-4xl font-extrabold text-foreground mb-1">{greeting}, {user.name.split(" ")[0]}!</h1>', 1
)
rw('src/routes/profile.tsx', prof)

# 2. petId
pet = rd('src/routes/pets/$petId.tsx')
pet = pet.replace(
    'import { useEffect, useState } from "react";',
    'import { useEffect, useState } from "react";\nimport { Check } from "lucide-react";', 1
)
pet = pet.replace('  const [activeTab', '  const [copied, setCopied] = useState(false);\n  const [activeTab', 1)
pet = pet.replace(
    'navigator.clipboard.writeText(window.location.href);\n      alert(lang === "ar" ? "تم نسخ الرابط!" : "Link copied to clipboard!");',
    'navigator.clipboard.writeText(window.location.href);\n      setCopied(true);\n      setTimeout(() => setCopied(false), 2000);', 1
)
pet = pet.replace(
    '<Share2 className="size-5" />',
    '{copied ? <Check className="size-5 text-green-500" /> : <Share2 className="size-5" />}', 1
)
rw('src/routes/pets/$petId.tsx', pet)

# 3. book
book = rd('src/routes/services/book.tsx')
book = book.replace(
    'import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, CreditCard, Stethoscope, Scissors } from "lucide-react";',
    'import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, CreditCard, Stethoscope, Scissors, Flame } from "lucide-react";', 1
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
                      )}''', 1
)
book = book.replace(
    'import { useNavigate, Link } from "@tanstack/react-router";',
    'import { useNavigate, Link } from "@tanstack/react-router";\nimport confetti from "canvas-confetti";', 1
)
book = book.replace(
    '      toast.success(lang === "ar" ? "تم حجز الموعد بنجاح!" : "Appointment booked successfully!");',
    '''      toast.success(lang === "ar" ? "تم حجز الموعد بنجاح!" : "Appointment booked successfully!");
      // Micro-interaction: Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffca28', '#ffffff', '#1a1a1a'],
        zIndex: 99999
      });''', 1
)
rw('src/routes/services/book.tsx', book)

# 4. cart
cart = rd('src/routes/shop/cart.tsx')
cart = cart.replace(
    'import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard, Info } from "lucide-react";',
    'import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard, Info, MessageCircle } from "lucide-react";\nimport confetti from "canvas-confetti";', 1
)
cart = cart.replace(
    'toast.success(lang === "ar" ? "تم تأكيد الطلب بنجاح!" : "Order placed successfully!");',
    '''toast.success(lang === "ar" ? "تم تأكيد الطلب بنجاح!" : "Order placed successfully!");
      // Micro-interaction: Confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffca28', '#ffffff', '#1a1a1a'],
        zIndex: 99999
      });''', 1
)
cart = cart.replace(
    '<p className="text-muted-foreground mt-2">{t.checkoutSuccessDesc}</p>',
    '''<p className="text-muted-foreground mt-2">{t.checkoutSuccessDesc}</p>
          <a href="https://wa.me/962799256345?text=Hello%2C%20I%20just%20placed%20an%20order%20on%20PetVan!" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/20">
            <MessageCircle className="size-5" />
            {lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
          </a>''', 1
)
rw('src/routes/shop/cart.tsx', cart)

def fix_password(filepath):
    content = rd(filepath)
    content = content.replace('import { ArrowLeft } from "lucide-react";', 'import { ArrowLeft, Eye, EyeOff } from "lucide-react";', 1)
    content = content.replace('const [loading, setLoading] = useState(false);', 'const [loading, setLoading] = useState(false);\n  const [showPassword, setShowPassword] = useState(false);', 1)
    
    # Replace type="password" with dynamic
    content = content.replace('type="password"', 'type={showPassword ? "text" : "password"}', 1)
    
    # Replace input class
    old_input = 'className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all hover:bg-background/80 mt-2"\n              />'
    new_input = '''className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur px-4 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all hover:bg-background/80 mt-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>'''
    content = content.replace(old_input, new_input, 1)
    
    # Wrap in relative div
    content = content.replace('<div>\n              <label className="text-sm font-medium leading-none" htmlFor="password">', '<div className="relative">\n              <label className="text-sm font-medium leading-none" htmlFor="password">', 1)
    
    rw(filepath, content)

fix_password('src/routes/login.tsx')
fix_password('src/routes/register.tsx')
print("Done clean injection")