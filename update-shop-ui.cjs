
const fs = require("fs");
let code = fs.readFileSync("src/routes/shop/index.tsx", "utf8");

code = code.replace(
  /className="w-full h-full object-cover"/g,
  `className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"`
);

// Enhance Add to Cart button
code = code.replace(
  /className="w-full rounded-xl bg-primary\/10 text-primary py-2\.5 text-sm font-bold mt-4 transition-colors hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"/g,
  `className="w-full rounded-xl bg-primary/10 text-primary py-2.5 text-sm font-bold mt-4 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_15px_color-mix(in_oklch,var(--color-primary)_40%,transparent)] flex items-center justify-center gap-2"`
);

fs.writeFileSync("src/routes/shop/index.tsx", code);
console.log("shop interactions enhanced");
