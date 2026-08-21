
const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

index = index.replace(
    /<div className="absolute top-1\/2 left-1\/2 -translate-x-1\/2 -translate-y-1\/2 w-\[80%\] aspect-square rounded-full bg-white opacity-95 shadow-\[0_0_80px_color-mix\(in_oklch,var\(--color-primary\)_40%,transparent\)\]"><\/div>\s*<img[^>]*\/>/g,
    `<div className="relative w-[80%] max-w-[400px] aspect-[4/5] mx-auto rounded-[3rem] overflow-hidden shadow-[var(--shadow-gold)] border border-primary/20 animate-fade-in-up">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none"></div>
            <img
              key={globalPetType || "default"}
              src={getHeroImage(globalPetType)}
              alt="Happy pet"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>`
);

fs.writeFileSync("src/routes/index.tsx", index);
