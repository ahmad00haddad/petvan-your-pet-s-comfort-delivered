import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# 1. SpotlightCard in shop/index.tsx
shop = rd('src/routes/shop/index.tsx')
if "import SpotlightCard" not in shop:
    shop = shop.replace(
        'import { copy } from "../../lib/i18n";',
        'import { copy } from "../../lib/i18n";\nimport SpotlightCard from "../../components/SpotlightCard";'
    )
    # Replace the Link card wrapper with SpotlightCard
    shop = shop.replace(
        '<Link\n                key={item.id}\n                to="/shop"',
        '<SpotlightCard key={item.id} className="p-0 border-0 bg-transparent" spotlightColor="rgba(255, 202, 40, 0.15)">\n              <Link\n                to="/shop"'
    )
    # the link is self-closing? No, it has </Link>
    shop = shop.replace(
        '</Link>\n            ))}',
        '</Link>\n              </SpotlightCard>\n            ))}'
    )
    rw('src/routes/shop/index.tsx', shop)

# 2. Magnetic in __root.tsx navigation
root = rd('src/routes/__root.tsx')
if "import Magnetic" not in root:
    root = root.replace(
        'import { MessageCircle } from "lucide-react";',
        'import { MessageCircle } from "lucide-react";\nimport Magnetic from "../components/Magnetic";'
    )
    # Add magnetic to Nav Links
    root = root.replace(
        '<Link\n                    key={item.to}',
        '<Magnetic key={item.to}>\n                  <Link'
    )
    root = root.replace(
        '                    {t.nav[item.label as keyof typeof t.nav]}\n                  </Link>',
        '                    {t.nav[item.label as keyof typeof t.nav]}\n                  </Link>\n                  </Magnetic>'
    )
    
    # Add magnetic to bottom nav links
    root = root.replace(
        '<Link\n                  key={item.to}\n                  to={item.to}',
        '<Magnetic key={item.to}>\n                <Link\n                  to={item.to}'
    )
    root = root.replace(
        '<span className="text-[10px] mt-1 font-medium">{t.nav[item.label as keyof typeof t.nav]}</span>\n                </Link>',
        '<span className="text-[10px] mt-1 font-medium">{t.nav[item.label as keyof typeof t.nav]}</span>\n                </Link>\n                </Magnetic>'
    )
    rw('src/routes/__root.tsx', root)

# 3. ScrambleText in adopt/index.tsx
adopt = rd('src/routes/adopt/index.tsx')
if "import ScrambleText" not in adopt:
    adopt = adopt.replace(
        'import { copy } from "../../lib/i18n";',
        'import { copy } from "../../lib/i18n";\nimport ScrambleText from "../../components/ScrambleText";'
    )
    adopt = adopt.replace(
        '<h1 className="text-4xl sm:text-5xl font-black font-display text-primary">\n            {t.adoptTitle}\n          </h1>',
        '<h1 className="text-4xl sm:text-5xl font-black font-display text-primary">\n            <ScrambleText text={t.adoptTitle} />\n          </h1>'
    )
    rw('src/routes/adopt/index.tsx', adopt)

print("Phase 5 applied.")