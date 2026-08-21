
const fs = require("fs");
let shop = fs.readFileSync("src/routes/shop/index.tsx", "utf8");

if (!shop.includes("import { SpotlightCard }")) {
    shop = `import { SpotlightCard } from "../../components/SpotlightCard";\n` + shop;
    
    // Replace product card divs with SpotlightCard
    // Find: <div key={product.name} className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-gold)]" onClick={() => setSelected(product)}>
    shop = shop.replace(
        /<div key=\{product\.name\} className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition-all hover:scale-\[1\.02\] hover:shadow-\[var\(--shadow-gold\)\]" onClick=\{.*?\} >/g,
        (match) => {
            return match.replace(/<div /, "<SpotlightCard ").replace(/className="/, `className="h-full flex flex-col `).replace(/bg-card /, ""); // SpotlightCard applies its own bg-card
        }
    );
    
    // We need to replace the closing div. In the map function:
    // </div>
    // ))}
    // </div>
    shop = shop.replace(/<\/div>\s*\)\)\}\s*<\/div>/g, `</SpotlightCard>\n          ))}\n        </div>`);
    
    fs.writeFileSync("src/routes/shop/index.tsx", shop);
}
