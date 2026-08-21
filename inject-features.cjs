
const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

if (!index.includes("import { SpotlightCard }")) {
    index = `import { SpotlightCard } from "../components/SpotlightCard";\nimport { ScrambleText } from "../components/ScrambleText";\n` + index;
    
    // Replace standard div cards for services with SpotlightCard
    // First, find the services mapping:
    // <div key={i} className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-2 hover:shadow-[var(--shadow-gold)]">
    index = index.replace(
        /<div\s+key=\{i\}\s+className="rounded-3xl border border-border bg-card p-6 shadow-\[var\(--shadow-card\)\] transition-transform hover:-translate-y-2 hover:shadow-\[var\(--shadow-gold\)\]"\s*>/g,
        `<SpotlightCard key={i} className="p-6 transition-transform hover:-translate-y-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-gold)]">`
    );
    // Replace the closing div
    // We need to carefully replace only the closing divs of the services map... Actually, I can just write a quick script or manually replace it safely.
}
fs.writeFileSync("src/routes/index.tsx", index);
