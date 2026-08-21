
const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

// Change closing div for SpotlightCard manually
index = index.replace(
    /<\/p>\s*<\/div>\s*<\/RevealOnScroll>/g,
    `</p>\n                </SpotlightCard>\n              </RevealOnScroll>`
);

// Add ScrambleText to hero
index = index.replace(
    /<span className="text-foreground">Pet<\/span>\n\s*<span className="text-primary">Van<\/span>/g,
    `<ScrambleText text="Pet" className="text-foreground" />\n                <ScrambleText text="Van" className="text-primary" />`
);

// Add dynamic greeting
index = index.replace(
    /\{t\.hello\} \{t\.friend\}/g,
    `{t.hello} {new Date().getHours() < 12 ? (lang === "ar" ? "صباح الخير!" : "Good morning!") : new Date().getHours() > 20 ? (lang === "ar" ? "تسوق متأخر؟" : "Late night shopping?") : t.friend}`
);

fs.writeFileSync("src/routes/index.tsx", index);
