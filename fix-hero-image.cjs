const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

// We need to clip the image to a circle so it doesn't leak out of the bounds as a square.
index = index.replace(
    /<div className="absolute top-1\/2 left-1\/2 -translate-x-1\/2 -translate-y-1\/2 w-\[120%\] aspect-square bg-foreground rounded-\[999px\] -z-10 shadow-\[0_0_80px_rgba\(255,255,255,0\.05\)\] pulsing-glow"><\/div>/,
    \<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[90%] aspect-square bg-foreground rounded-full shadow-[0_0_80px_rgba(255,255,255,0.05)] pulsing-glow overflow-hidden">\\n            <img key={globalPetType || "default"} src={getHeroImage(globalPetType)} alt="Happy pet" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />\\n          </div>\
);

// Remove the old img tag completely since we moved it inside the circle!
index = index.replace(
    /<img\s*key=\{globalPetType \|\| "default"\}\s*src=\{getHeroImage\(globalPetType\)\}\s*alt="Happy pet"\s*className="w-\[85%\] h-full object-contain mx-auto transition-transform duration-500 hover:scale-105"\s*\/>/g,
    ""
);


fs.writeFileSync("src/routes/index.tsx", index);