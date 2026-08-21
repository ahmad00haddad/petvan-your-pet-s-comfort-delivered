
const fs = require("fs");
let shop = fs.readFileSync("src/routes/shop/index.tsx", "utf8");
if (!shop.includes("import { Magnetic }")) {
    shop = `import { Magnetic } from "../../components/Magnetic";\n` + shop;
    // Find the Add to Cart button in the modal
    shop = shop.replace(/<button\s+onClick=\{addToCart\}[^>]*>[\s\S]*?<\/button>/, `<Magnetic className="w-full">$&</Magnetic>`);
    fs.writeFileSync("src/routes/shop/index.tsx", shop);
}
