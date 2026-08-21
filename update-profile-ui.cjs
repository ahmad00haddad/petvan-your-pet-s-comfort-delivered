
const fs = require("fs");
let code = fs.readFileSync("src/routes/profile.tsx", "utf8");

code = code.replace(
  /className="size-28 sm:size-32 rounded-full border-4 border-foreground\/20 overflow-hidden mb-4 transition-transform group-hover:scale-105 group-hover:border-primary relative"/g,
  `className="size-28 sm:size-32 rounded-full border-4 border-foreground/20 overflow-hidden mb-4 transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-[0_0_20px_color-mix(in_oklch,var(--color-primary)_40%,transparent)] relative"`
);

// Also the "List for Adoption" button should glow
code = code.replace(
  /className="w-full rounded-full border border-primary px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"/g,
  `className="w-full rounded-full border border-primary px-4 py-2 text-xs font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_15px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]"`
);

// Also the user avatar
code = code.replace(
  /className="size-40 rounded-full border-4 border-foreground\/20 overflow-hidden shadow-\[0_0_40px_rgba\(255,255,255,0\.05\)\]"/g,
  `className="size-40 rounded-full border-4 border-foreground/20 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 hover:scale-105 hover:border-primary hover:shadow-[0_0_30px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]"`
);

fs.writeFileSync("src/routes/profile.tsx", code);
console.log("profile interactions enhanced");
