import os, re

BASE = "src"

def rw(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def rd(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# ─────────────────────────────────────────────────────────────────────────────
# 1. FIX: cart.tsx — add lang + t, fix missing t.browseProducts, "Back to Shop",
#           "Shopping Cart", "Your cart is empty", "Payment Successful!", "Cancel",
#           "Checkout Details", "Pay Now", remove unused ContextHint import
# ─────────────────────────────────────────────────────────────────────────────
cart = rd("src/routes/shop/cart.tsx")

# Remove unused ContextHint import
cart = cart.replace('import { ContextHint } from "../../components/ContextHint";\r\n', "")
cart = cart.replace('import { ContextHint } from "../../components/ContextHint";\n', "")

# Add lang + t to Cart component
cart = cart.replace(
    '  const { cart, removeFromCart, updateQuantity, clearCart, userId } = useAppStore();',
    '  const { cart, removeFromCart, updateQuantity, clearCart, userId } = useAppStore();\n  const lang = useAppStore((state: any) => state.lang);\n  const t = copy[lang as keyof typeof copy];'
)

# Fix hardcoded strings
cart = cart.replace(">Back to Shop<", ">{lang === 'ar' ? 'العودة للمتجر' : 'Back to Shop'}<")
cart = cart.replace(">Shopping Cart<", ">{t.cart}<")
cart = cart.replace(">Your cart is empty.<", ">{t.cartEmpty}<")
cart = cart.replace(">Payment Successful!</", ">{lang === 'ar' ? 'تم الدفع بنجاح!' : 'Payment Successful!'}</")
cart = cart.replace(">Thank you for your purchase. Your items will be delivered soon.<", ">{lang === 'ar' ? 'شكراً لتسوقك! سيتم توصيل طلبك قريباً.' : 'Thank you for your purchase. Your items will be delivered soon.'}<")
cart = cart.replace(">Continue Shopping<", ">{lang === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}<")
cart = cart.replace(">Order placed successfully!</", ">{lang === 'ar' ? 'تم تقديم طلبك بنجاح!' : 'Order placed successfully!'}</")
cart = cart.replace(">Checkout failed. Please try again.</", ">{lang === 'ar' ? 'فشل الدفع، حاول مرة أخرى.' : 'Checkout failed. Please try again.'}</")
cart = cart.replace(">Checkout Details\r\n", ">{t.checkoutDetails}\r\n")
cart = cart.replace(">Checkout Details\n", ">{t.checkoutDetails}\n")
cart = cart.replace("Cancel\r\n                     ", "{t.cancel}\r\n                     ")
cart = cart.replace("Cancel\n                     ", "{t.cancel}\n                     ")
cart = cart.replace(">Order placed successfully!</", ">{lang === 'ar' ? 'تم الطلب!' : 'Order placed successfully!'}</")
cart = cart.replace('placeholder="e.g. Mecca St, Amman"', 'placeholder={lang === "ar" ? "مثال: شارع مكة، عمّان" : "e.g. Mecca St, Amman"}')
cart = cart.replace('placeholder="e.g. 079xxxxxxx"', 'placeholder={lang === "ar" ? "مثال: 079xxxxxxx" : "e.g. 079xxxxxxx"}')
# Add missing total label
cart = cart.replace(
    '              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">\r\n                 \r\n                <span>{(total + 2)',
    '              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">\r\n                <span>{t.total}</span>\n                <span>{(total + 2)'
)
cart = cart.replace(
    '              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">\n                 \n                <span>{(total + 2)',
    '              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">\n                <span>{t.total}</span>\n                <span>{(total + 2)'
)

rw("src/routes/shop/cart.tsx", cart)
print("✅ cart.tsx fixed")

# ─────────────────────────────────────────────────────────────────────────────
# 2. FIX: tracking.$orderId.tsx — add ALL missing imports + lang + t
# ─────────────────────────────────────────────────────────────────────────────
tracking = rd("src/routes/services/tracking.$orderId.tsx")

# Add missing imports at top
if 'import { useAppStore }' not in tracking:
    tracking = 'import { useAppStore } from "../../lib/store";\nimport { copy } from "../../lib/i18n";\n' + tracking

# Add lang + t to Tracking function
tracking = tracking.replace(
    'function Tracking() {\n  const { orderId } = Route.useParams();',
    'function Tracking() {\n  const { orderId } = Route.useParams();\n  const lang = useAppStore((state: any) => state.lang);\n  const t = copy[lang as keyof typeof copy];'
)

# Remove unused imports: useParams (already via Route.useParams), Heart
tracking = tracking.replace(', useParams', '')
tracking = tracking.replace(', Heart', '')

# Fix hardcoded strings
tracking = tracking.replace(">Back to Home\n", ">{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}\n")
tracking = tracking.replace(">Back to Home\r\n", ">{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}\r\n")
tracking = tracking.replace("Order #{order.id", "{lang === 'ar' ? 'طلب رقم #' : 'Order #'}{order.id")
tracking = tracking.replace('{arrived ? "has arrived!" : "is on the way!"}', '{arrived ? (lang === "ar" ? "وصل!" : "has arrived!") : (lang === "ar" ? "في الطريق!" : "is on the way!")}')
tracking = tracking.replace(">Service Completed!\n", ">{lang === 'ar' ? 'اكتملت الخدمة!' : 'Service Completed!'}\n")
tracking = tracking.replace(">Service Completed!\r\n", ">{lang === 'ar' ? 'اكتملت الخدمة!' : 'Service Completed!'}\r\n")
tracking = tracking.replace(
    "We hope your pet enjoyed the {order.serviceType} service with {order.driverName}. Please rate your experience!",
    "{lang === 'ar' ? `نأمل أن يكون حيوانك قد استمتع بخدمة ${order.serviceType}. يرجى تقييم تجربتك!` : `We hope your pet enjoyed the ${order.serviceType} service with ${order.driverName}. Please rate your experience!`}"
)
tracking = tracking.replace('placeholder="Leave a comment (optional)..."', 'placeholder={lang === "ar" ? "اترك تعليقاً (اختياري)..." : "Leave a comment (optional)..."}')
tracking = tracking.replace('"Thank you for your feedback!"', 'lang === "ar" ? "شكراً على تقييمك!" : "Thank you for your feedback!"')
tracking = tracking.replace(">Submit Rating\n", ">{lang === 'ar' ? 'إرسال التقييم' : 'Submit Rating'}\n")
tracking = tracking.replace(">Submit Rating\r\n", ">{lang === 'ar' ? 'إرسال التقييم' : 'Submit Rating'}\r\n")
# Fix the stroke color from HSL to use a standard color
tracking = tracking.replace('stroke="hsl(var(--primary) / 0.5)"', 'stroke="oklch(0.75 0.18 85 / 0.5)"')
# Fix Arrived string
tracking = tracking.replace('setTimeLeft("Arrived")', 'setTimeLeft(lang === "ar" ? "وصل" : "Arrived")')

rw("src/routes/services/tracking.$orderId.tsx", tracking)
print("✅ tracking.$orderId.tsx fixed")

# ─────────────────────────────────────────────────────────────────────────────
# 3. FIX: book.tsx — add lang + t, fix all inline ternaries and hardcoded strings
# ─────────────────────────────────────────────────────────────────────────────
book = rd("src/routes/services/book.tsx")

# Remove unused Magnetic import
book = book.replace('import { Magnetic } from "../../components/Magnetic";\n', "")
book = book.replace('import { Magnetic } from "../../components/Magnetic";\r\n', "")

# Add lang + t
if 'const lang = useAppStore' not in book:
    book = book.replace(
        'function BookService() {\n  const [selected, setSelected]',
        'function BookService() {\n  const lang = useAppStore((state: any) => state.lang);\n  const t = copy[lang as keyof typeof copy];\n  const [selected, setSelected]'
    )

# Add useAppStore import if missing
if 'useAppStore' not in book:
    book = book.replace('import { copy }', 'import { useAppStore } from "../../lib/store";\nimport { copy }')

# Fix "Back to Home"
book = book.replace(">Back to Home\n", ">{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}\n")
book = book.replace(">Back to Home\r\n", ">{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}\r\n")

# Fix Total label in summary card
book = book.replace(
    '<h2 className="font-display text-xl font-bold flex items-center">Total: {selected.price.toFixed(2)} JOD',
    '<h2 className="font-display text-xl font-bold flex items-center">{lang === "ar" ? "المجموع" : "Total"}: {selected.price.toFixed(2)} JOD'
)

# Fix "Our mobile van will arrive..."
book = book.replace(
    '>{lang === "ar" ? "ستصل العيادة المتنقلة إلى موقعك المسجل." : "Our mobile van will arrive at your registered location."}</p>',
    '>{lang === "ar" ? "ستصل العيادة المتنقلة إلى موقعك المسجل." : "Our mobile van will arrive at your registered location."}</p>'
)

rw("src/routes/services/book.tsx", book)
print("✅ book.tsx fixed")

# ─────────────────────────────────────────────────────────────────────────────
# 4. FIX: adopt/index.tsx — add copy import if missing
# ─────────────────────────────────────────────────────────────────────────────
adopt = rd("src/routes/adopt/index.tsx")
if 'import { copy' not in adopt:
    adopt = 'import { copy } from "../../lib/i18n";\n' + adopt
    rw("src/routes/adopt/index.tsx", adopt)
    print("✅ adopt/index.tsx fixed - added copy import")
else:
    print("✅ adopt/index.tsx - copy already imported")

# ─────────────────────────────────────────────────────────────────────────────
# 5. FIX: register.tsx — remove duplicate value/onChange on password input
#    Also fix unused ContextHint import, unused pass state
# ─────────────────────────────────────────────────────────────────────────────
reg = rd("src/routes/register.tsx")

# Remove unused ContextHint import
reg = reg.replace('import { ContextHint } from "../components/ContextHint";\r\n', "")
reg = reg.replace('import { ContextHint } from "../components/ContextHint";\n', "")

# Fix the password input having both 'value={pass}' AND 'required value={password} onChange=...'
# The correct one should be just using pass/setPass
reg = re.sub(
    r'id="password" type="password" value=\{pass\} onChange=\{\(e\) => setPass\(e\.target\.value\)\}',
    'id="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)}',
    reg
)
# Remove any leftover duplicate required value={password} onChange that may follow
reg = re.sub(
    r'(id="password"[^/]*?)(\s+required value=\{password\}\s+onChange=\{\(e\) => setPassword[^}]+\})',
    r'\1',
    reg
)

rw("src/routes/register.tsx", reg)
print("✅ register.tsx fixed")

# ─────────────────────────────────────────────────────────────────────────────
# 6. FIX: index.tsx — fix hardcoded English strings
# ─────────────────────────────────────────────────────────────────────────────
idx = rd("src/routes/index.tsx")

# Fix "FIND A NEW PET..."
idx = idx.replace(
    'FIND A NEW PET AND RESCUE IT FROM WHEN IT MIGHT BE ALONE OR LOST',
    '{lang === "ar" ? "اعثر على حيوان أليف جديد وانقذه قبل أن يضيع أو يُترك وحيداً" : "FIND A NEW PET AND RESCUE IT FROM WHEN IT MIGHT BE ALONE OR LOST"}'
)

# Fix "CHOOSE THE KIND OF SERVICES YOU NEED"
idx = idx.replace(
    'CHOOSE THE KIND OF SERVICES YOU NEED',
    '{lang === "ar" ? "اختر نوع الخدمة التي تحتاجها" : "CHOOSE THE KIND OF SERVICES YOU NEED"}'
)

# Fix service card description (hardcoded English)
idx = re.sub(
    r'The first mobile caravan specialized in caring for domestic pets by ordering a\s*caravan fully equipped\.\.\.',
    '{s.desc}',
    idx
)

# Fix "View More" button in adoption
idx = idx.replace(
    '>View More\n          </Link>',
    '>{t.viewMore}\n          </Link>'
)
idx = idx.replace(
    '>View More\r\n          </Link>',
    '>{t.viewMore}\r\n          </Link>'
)
idx = idx.replace(
    '>View More\r\n        </Link>',
    '>{t.viewMore}\r\n        </Link>'
)

# Fix stats labels
idx = idx.replace(">Pets Served<", ">{lang === 'ar' ? 'حيوان تمت خدمته' : 'Pets Served'}<")
idx = idx.replace(">Expert Vets<", ">{lang === 'ar' ? 'طبيب بيطري متخصص' : 'Expert Vets'}<")
idx = idx.replace(">Mobile Caravans<", ">{lang === 'ar' ? 'عيادة متنقلة' : 'Mobile Caravans'}<")
idx = idx.replace(">Client Rating<", ">{lang === 'ar' ? 'تقييم العملاء' : 'Client Rating'}<")

# Fix shopCats labels
idx = idx.replace(
    'const shopCats = [\n  { icon: Utensils, label: "Food" },\n  { icon: Wrench, label: "Tools" },\n  { icon: Gamepad2, label: "Games" },\n];',
    'const shopCats = [\n  { icon: Utensils, labelEn: "Food", labelAr: "طعام" },\n  { icon: Wrench, labelEn: "Tools", labelAr: "أدوات" },\n  { icon: Gamepad2, labelEn: "Games", labelAr: "ألعاب" },\n];'
)
idx = idx.replace(
    '<span className="text-[10px] font-bold text-foreground group-hover:text-primary transition-colors">{c.label}</span>',
    '<span className="text-[10px] font-bold text-foreground group-hover:text-primary transition-colors">{lang === "ar" ? c.labelAr : c.labelEn}</span>'
)

# Fix hero texts for pet types
idx = idx.replace(
    '    if (globalPetType === "Cats") return "Hello, Cat Lover! 🐱";\n    if (globalPetType === "Dogs") return "Hey, Dog Parent! 🐶";\n    if (globalPetType === "Birds") return "Tweet Tweet! 🦜";\n    if (globalPetType === "Fish") return "Glub Glub! 🐟";',
    '    if (globalPetType === "Cats") return lang === "ar" ? "أهلاً بك يا عاشق القطط! 🐱" : "Hello, Cat Lover! 🐱";\n    if (globalPetType === "Dogs") return lang === "ar" ? "مرحباً يا صاحب الكلاب! 🐶" : "Hey, Dog Parent! 🐶";\n    if (globalPetType === "Birds") return lang === "ar" ? "تغريد وفرح! 🦜" : "Tweet Tweet! 🦜";\n    if (globalPetType === "Fish") return lang === "ar" ? "عالم تحت الماء! 🐟" : "Glub Glub! 🐟";'
)

rw("src/routes/index.tsx", idx)
print("✅ index.tsx fixed")

# ─────────────────────────────────────────────────────────────────────────────
# 7. FIX: styles.css — restore I-beam cursor on inputs/textareas
# ─────────────────────────────────────────────────────────────────────────────
styles = rd("src/styles.css")
styles = styles.replace(
    'a, button, [role="button"], input, select, textarea {\n      cursor: none !important;\n    }',
    'a, button, [role="button"] {\n      cursor: none;\n    }\n    input, select, textarea {\n      cursor: text;\n    }'
)
styles = styles.replace(
    'a, button, [role="button"], input, select, textarea {\r\n      cursor: none !important;\r\n    }',
    'a, button, [role="button"] {\r\n      cursor: none;\r\n    }\r\n    input, select, textarea {\r\n      cursor: text;\r\n    }'
)
rw("src/styles.css", styles)
print("✅ styles.css cursor fixed")

# ─────────────────────────────────────────────────────────────────────────────
# 8. FIX: ScrambleText.tsx — cleanup interval on unmount
# ─────────────────────────────────────────────────────────────────────────────
scramble_content = '''import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_\\\\/[]{}=+*^?#";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isScrambling = useRef(false);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let frame = 0;
    const maxFrames = 20;
    const originalLength = text.length;

    intervalRef.current = setInterval(() => {
      let scrambled = "";
      for (let i = 0; i < originalLength; i++) {
        if (i < (frame / maxFrames) * originalLength) {
          scrambled += text[i];
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(scrambled);
      frame++;

      if (frame > maxFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isScrambling.current = false;
      }
    }, 30);
  };

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span onMouseEnter={scramble} className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
}
'''
rw("src/components/ScrambleText.tsx", scramble_content)
print("✅ ScrambleText.tsx fixed - interval cleanup added")

# ─────────────────────────────────────────────────────────────────────────────
# 9. FIX: SpotlightCard.tsx — use CSS var instead of hardcoded RGBA
# ─────────────────────────────────────────────────────────────────────────────
spotlight = rd("src/components/SpotlightCard.tsx")
spotlight = spotlight.replace(
    'rgba(255, 202, 40, 0.1)',
    'color-mix(in oklch, var(--color-primary) 12%, transparent)'
)
rw("src/components/SpotlightCard.tsx", spotlight)
print("✅ SpotlightCard.tsx fixed - using CSS var for color")

# ─────────────────────────────────────────────────────────────────────────────
# 10. FIX: i18n.ts — remove duplicate keys in en and ar blocks
# ─────────────────────────────────────────────────────────────────────────────
i18n = rd("src/lib/i18n.ts")

# The en object has duplicate: profile (L9 and L86), login (L24 and L87), 
# register (L25 and L88), installApp (L12 and L105), bookService (L17 and L116)
# Remove the second occurrence of duplicates in en block

def remove_duplicate_key(text, key, block_start, block_end):
    """Remove the second occurrence of a key within a block"""
    block = text[block_start:block_end]
    # Find all occurrences
    pattern = rf'^\s+{re.escape(key)}:.*$'
    matches = list(re.finditer(pattern, block, re.MULTILINE))
    if len(matches) > 1:
        # Remove the second occurrence
        second = matches[1]
        block = block[:second.start()] + block[second.end():]
        return text[:block_start] + block + text[block_end:]
    return text

# Find the en block boundaries (approximately)
en_start = i18n.find('  en: {')
ar_start = i18n.find('  ar: {')

for dup_key in ['profile', 'login', 'register', 'installApp', 'bookService']:
    i18n = remove_duplicate_key(i18n, dup_key, en_start, ar_start)

# Do the same for ar block
ar_end = i18n.rfind('};\n')
for dup_key in ['profile', 'login', 'register', 'installApp', 'bookService']:
    i18n = remove_duplicate_key(i18n, dup_key, ar_start, ar_end)

rw("src/lib/i18n.ts", i18n)
print("✅ i18n.ts fixed - removed duplicate keys")

# ─────────────────────────────────────────────────────────────────────────────
# 11. FIX: __root.tsx — fix "Back to Home", hardcoded footer, <a href> nav links
# ─────────────────────────────────────────────────────────────────────────────
root = rd("src/routes/__root.tsx")

# Fix hardcoded error/404 strings
root = root.replace(
    '"Page not found"', 
    'lang === "ar" ? "الصفحة غير موجودة" : "Page not found"'
)
root = root.replace(
    "The page you're looking for doesn't exist or has been moved.",
    '{lang === "ar" ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." : "The page you\'re looking for doesn\'t exist or has been moved."}'
)
root = root.replace(
    '>Go home</a>',
    '>{lang === "ar" ? "العودة للرئيسية" : "Go home"}</a>'
)
root = root.replace(
    '>"This page didn\'t load"',
    'lang === "ar" ? "لم يتم تحميل هذه الصفحة" : "This page didn\'t load"'
)
root = root.replace(
    '"This page didn\'t load"',
    'lang === "ar" ? "لم يتم تحميل هذه الصفحة" : "This page didn\'t load"'
)
root = root.replace(
    '>Try again</button>',
    '>{lang === "ar" ? "حاول مجدداً" : "Try again"}</button>'
)

# Fix footer aboutText
root = root.replace(
    '"The first mobile veterinary clinic in Jordan specialized in caring for domestic pets by ordering a caravan fully equipped with the latest tools and working hands from experienced doctors."',
    't.aboutText'
)
# Fix Quick Links inline ternary properly (it's already partially translated)
# The footer "Quick Links" is already done with inline ternary from previous fix, leave it.

rw("src/routes/__root.tsx", root)
print("✅ __root.tsx fixed")

# ─────────────────────────────────────────────────────────────────────────────
# 12. FIX: profile.tsx — pet type mismatch (singular vs plural)
# ─────────────────────────────────────────────────────────────────────────────
profile = rd("src/routes/profile.tsx")

# The option values are "Cat", "Dog", "Bird" but pets.ts checks "Cats", "Dogs"...
# The simplest fix: change the option values to match what pets.ts expects
profile = profile.replace('value="Cat">{t.catsWord}', 'value="Cats">{t.catsWord}')
profile = profile.replace('value="Dog">{t.dogsWord}', 'value="Dogs">{t.dogsWord}')
profile = profile.replace('value="Bird">{t.birdsWord}', 'value="Birds">{t.birdsWord}')
profile = profile.replace('value="Fish">{t.fishWord}', 'value="Fish">{t.fishWord}')
profile = profile.replace('value="Other">{t.otherWord}', 'value="Other">{t.otherWord}')

# Fix "Adopt" button
profile = profile.replace(
    '>Adopt</button>',
    '>{t.adoptBtn}</button>'
)
# Fix "List for Adoption" modal title
profile = profile.replace(
    '>List for Adoption</h2>',
    '>{t.listAdoption}</h2>'
)
# Fix "Cancel" buttons  
profile = profile.replace(
    '>Cancel</button>',
    '>{t.cancel}</button>'
)
# Fix "Loading profile..."
profile = profile.replace(
    '"Loading profile..."',
    'lang === "ar" ? "جاري تحميل الملف الشخصي..." : "Loading profile..."'
)
# Fix "View More"
profile = profile.replace('>View More</Link>', '>{t.viewMore}</Link>')
profile = profile.replace('>View More</button>', '>{t.viewMore}</button>')

# Fix placeholder texts
profile = profile.replace(
    'placeholder="e.g. Very friendly and loves to play..."',
    'placeholder={lang === "ar" ? "مثال: ودود جداً ويحب اللعب..." : "e.g. Very friendly and loves to play..."}'
)
profile = profile.replace(
    'placeholder="e.g. Bella"',
    'placeholder={lang === "ar" ? "مثال: بيلا" : "e.g. Bella"}'
)

rw("src/routes/profile.tsx", profile)
print("✅ profile.tsx fixed")

print("\n🎉 All critical fixes applied! Ready to build.")
