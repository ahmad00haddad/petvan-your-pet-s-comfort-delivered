const fs = require('fs');
let code = fs.readFileSync('src/routes/shop/index.tsx', 'utf8');

if (!code.includes('const t = copy[lang];')) {
  code = code.replace(
    '  const cart = useAppStore((state) => state.cart);',
    '  const cart = useAppStore((state) => state.cart);\n  const lang = useAppStore((state) => state.lang);\n  const t = copy[lang];'
  );
  code = code.replace(
    'import { toast } from "sonner";',
    'import { toast } from "sonner";\nimport { copy } from "../../lib/i18n";'
  );
}

code = code.replace(/<h1 className="[^"]*">Pet Shop<\/h1>/g, (m) => m.replace('Pet Shop', '{t.petShop}'));
code = code.replace(/← Home/g, '← {t.home}');
code = code.replace(/Cart\s*\{cart.length/g, '{t.cart}\n          {cart.length');
code = code.replace(/"Food"/g, 't.catsWord');
code = code.replace(/"Tools"/g, 't.toolsWord || "Tools"'); 
code = code.replace(/"Games"/g, 't.gamesWord || "Games"'); 
code = code.replace(/>No items found</g, '>{t.noItems}<');
code = code.replace(/>\s*We couldn't find any products matching your current filters\. Try selecting a different category\.\s*</g, '>\n              {t.noItemsDesc}\n            <');
code = code.replace(/>\s*Clear Filters\s*</g, '>\n              {t.clearFilters}\n            <');
code = code.replace(/>\s*Best Seller\s*</g, '>\n                  {t.bestSeller}\n                <');
code = code.replace(/>\s*New Arrival\s*</g, '>\n                  {t.newArrival}\n                <');
code = code.replace(/>Flavor</g, '>{t.flavor}<');
code = code.replace(/>Age Group</g, '>{t.ageGroup}<');
code = code.replace(/>\s*Add to Cart\s*</g, '>\n                      {t.addToCartText}\n                    <');
code = code.replace(
  'aspect-square flex items-center justify-center p-4"',
  'aspect-square flex items-center justify-center p-4 relative max-h-[50vh]"'
);

fs.writeFileSync('src/routes/shop/index.tsx', code);
console.log('shop/index.tsx updated');
