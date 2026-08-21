const fs = require('fs');

const files = ['src/routes/index.tsx', 'src/routes/profile.tsx'];

files.forEach(f => {
  let txt = fs.readFileSync(f, 'utf8');
  txt = txt.replace(/bg-\[#FFC107\]/g, 'bg-primary');
  txt = txt.replace(/text-\[#FFC107\]/g, 'text-primary');
  txt = txt.replace(/border-\[#FFC107\]/g, 'border-primary');
  txt = txt.replace(/from-\[#FFC107\]/g, 'from-primary');
  
  txt = txt.replace(/bg-\[#1a1a1a\]/g, 'bg-background');
  txt = txt.replace(/text-\[#1a1a1a\]/g, 'text-primary-foreground');
  
  txt = txt.replace(/border-\[#2a2a2a\]/g, 'border-border');
  
  // also replace standalone hex if it exists (e.g. inside string literals)
  // but let's just stick to the Tailwind classes for safety.
  fs.writeFileSync(f, txt);
});
console.log("Done");
