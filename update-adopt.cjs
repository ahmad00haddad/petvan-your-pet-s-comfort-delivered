const fs = require('fs');
let code = fs.readFileSync('src/routes/adopt/index.tsx', 'utf8');

if (!code.includes('const t = copy[lang];')) {
  code = code.replace(
    '  const globalPetType = useAppStore((state) => state.globalPetType);',
    '  const globalPetType = useAppStore((state) => state.globalPetType);\n  const lang = useAppStore((state) => state.lang);\n  const t = copy[lang];'
  );
  code = code.replace(
    'import { Heart, Search, Filter, ShieldCheck, Clock, MapPin, X } from "lucide-react";',
    'import { Heart, Search, Filter, ShieldCheck, Clock, MapPin, X } from "lucide-react";\nimport { copy } from "../../lib/i18n";'
  );
}

code = code.replace(/>Adoption Center</g, '>{t.adoptCenter}<');
code = code.replace(/>\s*Meet your new best friend and give them a forever home\.\s*</g, '>\n            {t.adoptCenterDesc}\n          <');
code = code.replace(/>\s*Show All Pets \(Match Me\)\s*</g, '>\n            {t.showAllPets}\n          <');
code = code.replace(/>\s*Match Me\s*</g, '>\n              {t.matchMe}\n            <');
code = code.replace(/>Adopt</g, '>{t.adoptBtn}<');
code = code.replace(/>Adoption Process</g, '>{t.adoptProcess}<');
code = code.replace(/>About</g, '>{t.aboutPet}<');
code = code.replace(/>Health Status</g, '>{t.healthStatus}<');
code = code.replace(/>Personality</g, '>{t.personality}<');

fs.writeFileSync('src/routes/adopt/index.tsx', code);
console.log('adopt/index.tsx updated');
