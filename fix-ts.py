import re

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# Fix pets/$petId.tsx
pet = rd('src/routes/pets/$petId.tsx')
pet = pet.replace('import { Check, \n  ArrowLeft,', 'import {\n  ArrowLeft,')
pet = pet.replace('import { Check, copy } from "../../lib/i18n";', 'import { copy } from "../../lib/i18n";')
# Add check to lucide-react if missing
if 'Check,' not in pet and 'Check }' not in pet:
    pet = pet.replace('QrCode,\n} from "lucide-react";', 'QrCode,\n  Check,\n} from "lucide-react";')
rw('src/routes/pets/$petId.tsx', pet)

# Fix profile.tsx
prof = rd('src/routes/profile.tsx')
prof = prof.replace(
    """const t = copy[lang];
  
  // Micro-interaction: Time of Day Greeting
  const hour = new Date().getHours();
  const greetingEn = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const greetingAr = hour < 12 ? "صباح الخير" : "مساء الخير";
  const greeting = lang === "ar" ? greetingAr : greetingEn;
""",
    "const t = copy[lang];"
)
prof = prof.replace(
    "const t = copy[lang];",
    """const t = copy[lang];
  
  // Micro-interaction: Time of Day Greeting
  const hour = new Date().getHours();
  const greetingEn = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const greetingAr = hour < 12 ? "صباح الخير" : "مساء الخير";
  const greeting = lang === "ar" ? greetingAr : greetingEn;
""", 1  # Only replace the FIRST occurrence
)
rw('src/routes/profile.tsx', prof)

# Fix register.tsx
reg = rd('src/routes/register.tsx')
reg = re.sub(r'type="email"\s+type=\{showPassword \? "text" : "password"\}', 'type="email"', reg)
reg = re.sub(r'type=\{showPassword \? "text" : "password"\}\s+type=\{showPassword \? "text" : "password"\}', 'type={showPassword ? "text" : "password"}', reg)
rw('src/routes/register.tsx', reg)

print("Fixed TS errors")