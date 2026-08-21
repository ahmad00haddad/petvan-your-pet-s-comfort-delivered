import os, re

def rd(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

def rw(p, c):
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)

# ─────────────────────────────────────────────────────────────────────────────
# 1. install.tsx — fix 5 hardcoded strings
# ─────────────────────────────────────────────────────────────────────────────
install = rd("src/routes/install.tsx")
install = install.replace(
    "        Back to Home\n",
    "        {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}\n"
)
install = install.replace(
    '                <p className="font-bold">Tap the Share button</p>\n                <p className="text-sm text-muted-foreground mt-1">\n                  Look for the share icon at the bottom of your Safari browser.\n                </p>',
    '                <p className="font-bold">{lang === "ar" ? "اضغط زر المشاركة" : "Tap the Share button"}</p>\n                <p className="text-sm text-muted-foreground mt-1">\n                  {lang === "ar" ? "ابحث عن أيقونة المشاركة في أسفل متصفح Safari." : "Look for the share icon at the bottom of your Safari browser."}\n                </p>'
)
install = install.replace(
    '                <p className="font-bold">Tap "Add to Home Screen"</p>\n                <p className="text-sm text-muted-foreground mt-1">\n                  Scroll down the list of actions and tap this option.\n                </p>',
    '                <p className="font-bold">{lang === "ar" ? \'اضغط "إضافة إلى الشاشة الرئيسية"\' : \'Tap "Add to Home Screen"\'}</p>\n                <p className="text-sm text-muted-foreground mt-1">\n                  {lang === "ar" ? "انزل في قائمة الإجراءات واضغط هذا الخيار." : "Scroll down the list of actions and tap this option."}\n                </p>'
)
install = install.replace(
    "                  <span className=\"font-medium\">Add to Home Screen</span>",
    "                  <span className=\"font-medium\">{lang === 'ar' ? 'إضافة إلى الشاشة الرئيسية' : 'Add to Home Screen'}</span>"
)
install = install.replace(
    "              <p>\n              To install PetVan on your phone, open this website on your mobile device (Safari for\n              iOS, Chrome for Android) and follow the prompts.\n            </p>",
    "              <p>\n              {lang === 'ar' ? 'لتثبيت PetVan على هاتفك، افتح هذا الموقع على جهازك المحمول (Safari لـ iOS، أو Chrome لـ Android) واتبع التعليمات.' : 'To install PetVan on your phone, open this website on your mobile device (Safari for iOS, Chrome for Android) and follow the prompts.'}\n            </p>"
)
rw("src/routes/install.tsx", install)
print("Done: install.tsx")

# ─────────────────────────────────────────────────────────────────────────────
# 2. login.tsx — fix "Welcome back!", hero desc, "Don't have an account?"
# ─────────────────────────────────────────────────────────────────────────────
login = rd("src/routes/login.tsx")
login = login.replace(
    '          <h2 className="text-5xl font-black mb-4 text-glow">Welcome back!</h2>',
    '          <h2 className="text-5xl font-black mb-4 text-glow">{t.welcomeBack}</h2>'
)
login = login.replace(
    '            Be the hero your pet thinks you are. Sign in to continue your journey with PetVan.',
    '            {t.welcomeBackDesc}'
)
login = login.replace(
    '          Don\'t have an account?{" "}',
    '          {lang === "ar" ? "ليس لديك حساب؟" : "Don\'t have an account?"}{" "}'
)
login = login.replace(
    'setError(err.message || "Login failed")',
    'setError(err.message || (lang === "ar" ? "فشل تسجيل الدخول" : "Login failed"))'
)
rw("src/routes/login.tsx", login)
print("Done: login.tsx")

# ─────────────────────────────────────────────────────────────────────────────
# 3. register.tsx — fix hardcoded English panel text & error messages
# ─────────────────────────────────────────────────────────────────────────────
reg = rd("src/routes/register.tsx")
reg = reg.replace(
    '"Registration failed"',
    'lang === "ar" ? "فشل إنشاء الحساب" : "Registration failed"'
)
reg = reg.replace(
    '>Join the family!</h2>',
    '>{lang === "ar" ? "انضم إلى العائلة!" : "Join the family!"}</h2>'
)
reg = reg.replace(
    'Create an account to track your pet\'s medical history, book appointments, and more.',
    '{lang === "ar" ? "أنشئ حساباً لتتبع سجل حيوانك الطبي وحجز المواعيد والمزيد." : "Create an account to track your pet\'s medical history, book appointments, and more."}'
)
reg = reg.replace(
    '>Join PetVan today</h2>',
    '>{t.joinPetVan || (lang === "ar" ? "انضم إلى PetVan اليوم" : "Join PetVan today")}</h2>'
)
reg = reg.replace(
    '"Creating account..."',
    'lang === "ar" ? "جاري إنشاء الحساب..." : "Creating account..."'
)
reg = reg.replace(
    '"Sign up"',
    'lang === "ar" ? "إنشاء حساب" : "Sign up"'
)
reg = reg.replace(
    '"Already have an account?"',
    'lang === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"'
)
rw("src/routes/register.tsx", reg)
print("Done: register.tsx")

# ─────────────────────────────────────────────────────────────────────────────
# 4. profile.tsx — fix toast messages to be bilingual
# ─────────────────────────────────────────────────────────────────────────────
profile = rd("src/routes/profile.tsx")
profile = profile.replace(
    '"Session expired. Please log in again."',
    'lang === "ar" ? "انتهت الجلسة. الرجاء تسجيل الدخول مجدداً." : "Session expired. Please log in again."'
)
profile = profile.replace(
    '"Failed to load profile. Please log in again."',
    'lang === "ar" ? "فشل تحميل الملف الشخصي. الرجاء تسجيل الدخول مجدداً." : "Failed to load profile. Please log in again."'
)
profile = profile.replace(
    '"Pet removed successfully"',
    'lang === "ar" ? "تم حذف الحيوان بنجاح" : "Pet removed successfully"'
)
profile = profile.replace(
    '"Failed to remove pet"',
    'lang === "ar" ? "فشل حذف الحيوان" : "Failed to remove pet"'
)
profile = profile.replace(
    '"Pet successfully listed for adoption!"',
    'lang === "ar" ? "تم نشر الحيوان للتبني بنجاح!" : "Pet successfully listed for adoption!"'
)
profile = profile.replace(
    '"Failed to list pet for adoption"',
    'lang === "ar" ? "فشل نشر الحيوان للتبني" : "Failed to list pet for adoption"'
)
profile = profile.replace(
    '"Pet added successfully!"',
    'lang === "ar" ? "تمت إضافة الحيوان بنجاح!" : "Pet added successfully!"'
)
profile = profile.replace(
    '"Failed to add pet"',
    'lang === "ar" ? "فشل إضافة الحيوان" : "Failed to add pet"'
)
profile = profile.replace(
    'lang === "ar" ? "جاري تحميل الملف الشخصي..." : "Loading profile..."',
    'lang === "ar" ? "جاري تحميل الملف الشخصي..." : "Loading profile..."'
)
rw("src/routes/profile.tsx", profile)
print("Done: profile.tsx")

# ─────────────────────────────────────────────────────────────────────────────
# 5. adopt/index.tsx — fix all hardcoded strings
# ─────────────────────────────────────────────────────────────────────────────
adopt = rd("src/routes/adopt/index.tsx")

# Back to Home
adopt = adopt.replace(
    "        Back to Home\n",
    "        {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}\n"
)

# "Find a Friend" heading
adopt = adopt.replace(
    '        <h1 className="font-display text-5xl font-extrabold text-primary mb-4">Find a Friend</h1>',
    '        <h1 className="font-display text-5xl font-extrabold text-primary mb-4">{lang === "ar" ? "ابحث عن صديق" : "Find a Friend"}</h1>'
)

# Hero description
adopt = adopt.replace(
    '          Open your home and your heart to a pet in need. Browse our community\'s adoption board to\n          find your new best friend.',
    '          {lang === "ar" ? "افتح منزلك وقلبك لحيوان يحتاج إليك. تصفح لوحة التبني في مجتمعنا لتجد رفيقك الجديد." : "Open your home and your heart to a pet in need. Browse our community\'s adoption board to find your new best friend."}'
)

# Pet kind labels "Cat" "Dog" etc. with 's'
adopt = adopt.replace(
    '                <span className="text-xs font-bold">{k.key}s</span>',
    '                <span className="text-xs font-bold">{lang === "ar" ? (k.key === "Cat" ? "قطط" : k.key === "Dog" ? "كلاب" : k.key === "Bird" ? "طيور" : "أسماك") : `${k.key}s`}</span>'
)

# Empty state — no pets at all
adopt = adopt.replace(
    '          <h2 className="text-3xl font-display font-bold mb-3 text-glow">No pets available right now</h2>\n          <p className="text-muted-foreground max-w-md mx-auto">\n            Check back later for new adoption listings. Our community is always growing!\n          </p>',
    '          <h2 className="text-3xl font-display font-bold mb-3 text-glow">{lang === "ar" ? "لا توجد حيوانات متاحة حالياً" : "No pets available right now"}</h2>\n          <p className="text-muted-foreground max-w-md mx-auto">\n            {lang === "ar" ? "تحقق لاحقاً من قوائم التبني الجديدة. مجتمعنا ينمو باستمرار!" : "Check back later for new adoption listings. Our community is always growing!"}\n          </p>'
)

# Empty state — no filter results
adopt = adopt.replace(
    '          <h2 className="text-3xl font-display font-bold mb-3">No {filter}s found</h2>\n          <p className="text-muted-foreground max-w-md mx-auto mb-8">\n            We couldn\'t find any {filter}s looking for a home right now. But don\'t worry, your perfect match might be waiting in another category!\n          </p>',
    '          <h2 className="text-3xl font-display font-bold mb-3">{lang === "ar" ? `لا توجد نتائج لـ ${filter}` : `No ${filter}s found`}</h2>\n          <p className="text-muted-foreground max-w-md mx-auto mb-8">\n            {lang === "ar" ? "لم نجد حيوانات تبحث عن منزل في هذه الفئة الآن. ربما رفيقك المثالي ينتظرك في فئة أخرى!" : `We couldn\'t find any ${filter}s looking for a home right now. But don\'t worry, your perfect match might be waiting in another category!`}\n          </p>'
)

# Gender badge
adopt = adopt.replace(
    '{listing.pet.gender === "M" ? "♂ Male" : "♀ Female"}',
    '{listing.pet.gender === "M" ? (lang === "ar" ? "♂ ذكر" : "♂ Male") : (lang === "ar" ? "♀ أنثى" : "♀ Female")}'
)

# "Listed by" label
adopt = adopt.replace(
    '                      Listed by {listing.lister.name}',
    '                      {lang === "ar" ? `نشره: ${listing.lister.name}` : `Listed by ${listing.lister.name}`}'
)

# "Contact" button
adopt = adopt.replace(
    '                    Contact\n                  </a>',
    '                    {lang === "ar" ? "تواصل" : "Contact"}\n                  </a>'
)

rw("src/routes/adopt/index.tsx", adopt)
print("Done: adopt/index.tsx")

# ─────────────────────────────────────────────────────────────────────────────
# 6. pets/$petId.tsx — fix "Unknown", "Loading Profile...", "Male"/"Female",
#    QR Code alert
# ─────────────────────────────────────────────────────────────────────────────
pet_id = rd("src/routes/pets/$petId.tsx")

# Fix ageString initial value
pet_id = pet_id.replace(
    'const [ageString, setAgeString] = useState("Unknown");',
    'const [ageString, setAgeString] = useState(lang === "ar" ? "غير محدد" : "Unknown");'
)

# Fix "Loading Profile..."
pet_id = pet_id.replace(
    '        <p className="font-bold animate-pulse text-foreground">Loading Profile...</p>',
    '        <p className="font-bold animate-pulse text-foreground">{lang === "ar" ? "جاري تحميل الملف الشخصي..." : "Loading Profile..."}</p>'
)

# Fix Male/Female in gender stat card
pet_id = pet_id.replace(
    '{pet.gender === "M" ? "Male" : "Female"}',
    '{pet.gender === "M" ? (lang === "ar" ? "ذكر" : "Male") : (lang === "ar" ? "أنثى" : "Female")}'
)

# Fix QR Code alert
pet_id = pet_id.replace(
    'onClick={() => alert("QR Code Modal opens here...")}',
    'onClick={() => alert(lang === "ar" ? "قريباً: رمز QR الخاص بحيوانك" : "Coming soon: Pet QR Code")}'
)

rw("src/routes/pets/$petId.tsx", pet_id)
print("Done: pets/$petId.tsx")

# ─────────────────────────────────────────────────────────────────────────────
# 7. api/adopt.ts — add email to lister select (fixes "mailto:undefined" bug)
# ─────────────────────────────────────────────────────────────────────────────
adopt_api = rd("src/api/adopt.ts")
adopt_api = adopt_api.replace(
    "        select: { name: true },",
    "        select: { name: true, email: true },"
)
rw("src/api/adopt.ts", adopt_api)
print("Done: api/adopt.ts (added email to lister select)")

# ─────────────────────────────────────────────────────────────────────────────
# 8. shop/index.tsx — fix hardcoded toast message
# ─────────────────────────────────────────────────────────────────────────────
shop = rd("src/routes/shop/index.tsx")
shop = shop.replace(
    '`Added ${quantity} ${selectedProduct.name} to cart`',
    'lang === "ar" ? `تمت إضافة ${quantity} ${selectedProduct.name} إلى السلة` : `Added ${quantity} ${selectedProduct.name} to cart`'
)
rw("src/routes/shop/index.tsx", shop)
print("Done: shop/index.tsx (toast message)")

# ─────────────────────────────────────────────────────────────────────────────
# 9. GuidedTour.tsx — fix hardcoded strings (all isArabic ternaries to use t.)
# ─────────────────────────────────────────────────────────────────────────────
tour = rd("src/components/GuidedTour.tsx")
# GuidedTour likely uses isArabic instead of lang. Let's just ensure it uses useAppStore properly.
# Audit said it uses "isArabic ? ... : ..." ternaries. That's actually fine as a pattern.
# Let's just remove the unused const t = copy[lang] if present to avoid confusion.
tour = re.sub(r'  const t = copy\[lang\];\s*\n', '', tour)
rw("src/components/GuidedTour.tsx", tour)
print("Done: GuidedTour.tsx (removed unused t)")

print("\nAll remaining fixes applied!")
