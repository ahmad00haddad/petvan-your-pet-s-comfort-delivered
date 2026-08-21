import os
import re

def fix_root():
    path = "src/routes/__root.tsx"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Logo Location text
    content = re.sub(r'<span className="font-bold">Location</span>', r'<span className="font-bold">{t.location}</span>', content)
    content = re.sub(r'<span className="text-muted-foreground text-xs">Amman</span>', r'<span className="text-muted-foreground text-xs">{t.city}</span>', content)
    
    # Nav links
    content = re.sub(r'>\s*ABOUT US\s*</a>', r'>{t.nav.about}</a>', content)
    content = re.sub(r'>\s*OUR SERVICES\s*</a>', r'>{t.nav.services}</a>', content)
    content = re.sub(r'>\s*HELP\s*</a>', r'>{t.nav.help}</a>', content)
    content = re.sub(r'>\s*INSTALL APP\s*</Link>', r'>{t.installApp}</Link>', content)

    # Footer
    content = re.sub(r'>\s*About Us\s*</h2>', r'>{t.aboutUs}</h2>', content)
    content = re.sub(r'>\s*Quick Links\s*</h2>', r'>{t.nav.services}</h2>', content) # Re-use services or make a quick links
    content = re.sub(r'>\s*Our Services\s*</a>', r'>{t.nav.services}</a>', content)
    content = re.sub(r'>\s*Adopt a Pet\s*</Link>', r'>{t.adopt}</Link>', content)
    content = re.sub(r'>\s*Pet Shop\s*</Link>', r'>{t.shop}</Link>', content)
    content = re.sub(r'>\s*Install App\s*</Link>', r'>{t.installApp}</Link>', content)
    content = re.sub(r'>\s*Contact Us\s*</h2>', r'>{t.contactUs}</h2>', content)
    content = re.sub(r'>\s*Social With Us\s*</h2>', r'>{t.socialWithUs}</h2>', content)
    content = re.sub(r'Ahmad Haddad © All rights reserved\.', r'{t.rights}', content)
    
    # Fix Quick Links specifically
    content = re.sub(r'<h2 className="font-display font-bold text-lg mb-4 text-foreground">\{t\.nav\.services\}</h2>', r'<h2 className="font-display font-bold text-lg mb-4 text-foreground">{lang === "ar" ? "روابط سريعة" : "Quick Links"}</h2>', content)
    
    # Check if t is defined in RootComponent
    if "const t = copy[lang];" not in content:
        content = re.sub(r'function RootComponent\(\) \{', r'function RootComponent() {\n  const lang = useAppStore((state: any) => state.lang) as keyof typeof copy;\n  const t = copy[lang];', content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def fix_profile():
    path = "src/routes/profile.tsx"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix pet types dropdown
    content = re.sub(r'<option value="Cat">Cat</option>', r'<option value="Cat">{t.catsWord}</option>', content)
    content = re.sub(r'<option value="Dog">Dog</option>', r'<option value="Dog">{t.dogsWord}</option>', content)
    content = re.sub(r'<option value="Bird">Bird</option>', r'<option value="Bird">{t.birdsWord}</option>', content)
    content = re.sub(r'<option value="Fish">Fish</option>', r'<option value="Fish">{t.fishWord}</option>', content)
    content = re.sub(r'<option value="Other">Other</option>', r'<option value="Other">{t.otherWord}</option>', content)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def fix_book():
    path = "src/routes/services/book.tsx"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # The service names are hardcoded in the array at the top!
    # They should be dynamic based on translation.
    # I'll just change the render mapping to check t.services
    content = re.sub(r'<h3 className="font-display text-lg font-bold">\{s\.name\}<\/h3>', r'<h3 className="font-display text-lg font-bold">{s.id === "MEDICAL" ? t.services[0].title : s.id === "HOTEL" ? t.services[1].title : t.services[2].title}</h3>', content)
    content = re.sub(r'<p className="mt-2 text-xs text-muted-foreground flex-grow">\{s\.desc\}<\/p>', r'<p className="mt-2 text-xs text-muted-foreground flex-grow">{s.id === "MEDICAL" ? t.services[0].desc : s.id === "HOTEL" ? t.services[1].desc : t.services[2].desc}</p>', content)
    
    content = re.sub(r'>\s*Confirming\.\.\.\s*:', r'>{lang === "ar" ? "جاري التأكيد..." : "Confirming..."} :', content)
    content = re.sub(r':\s*"Confirm Booking"\s*}', r': lang === "ar" ? "تأكيد الحجز" : "Confirm Booking"}', content)
    
    content = re.sub(r'<Dialog.Title className="font-display text-2xl font-bold">\s*Confirm Booking\s*<\/Dialog.Title>', r'<Dialog.Title className="font-display text-2xl font-bold">{lang === "ar" ? "تأكيد الحجز" : "Confirm Booking"}</Dialog.Title>', content)
    content = re.sub(r'Are you sure you want to book the <strong>\{selected\.name\}<\/strong> service\? A\s*mobile van will be dispatched to your location immediately\.', r'{lang === "ar" ? "هل أنت متأكد أنك تريد حجز خدمة" : "Are you sure you want to book the"} <strong>{selected.id === "MEDICAL" ? t.services[0].title : selected.id === "HOTEL" ? t.services[1].title : t.services[2].title}</strong> {lang === "ar" ? "؟ سيتم إرسال عيادة متنقلة لموقعك فوراً." : "service? A mobile van will be dispatched to your location immediately."}', content)
    content = re.sub(r'Cost: \{selected\.price\.toFixed\(2\)\}', r'{t.cost} {selected.price.toFixed(2)}', content)
    content = re.sub(r'>\s*Cancel\s*<\/button>', r'>{t.cancel}</button>', content)
    content = re.sub(r'>\s*Yes, dispatch van\s*<\/button>', r'>{lang === "ar" ? "نعم، أرسل العيادة" : "Yes, dispatch van"}</button>', content)
    content = re.sub(r'>\s*Our mobile van will arrive at your registered location\.\s*<\/p>', r'>{lang === "ar" ? "ستصل العيادة المتنقلة إلى موقعك المسجل." : "Our mobile van will arrive at your registered location."}</p>', content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def fix_index():
    path = "src/routes/index.tsx"
    if not os.path.exists(path): return
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = re.sub(r'>\s*PetVan brings medical care, grooming, boarding, a pet shop and adoption to your door in Amman and Irbid\.\s*<\/p>', r'>{lang === "ar" ? "يقدم بيت-فان الرعاية الطبية، العناية، الإقامة، متجر الحيوانات الأليفة والتبني إلى باب منزلك في عمّان وإربد." : "PetVan brings medical care, grooming, boarding, a pet shop and adoption to your door in Amman and Irbid."}</p>', content)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

fix_root()
fix_profile()
fix_book()
fix_index()
print("Fixed translations")