
const fs = require("fs");
let root = fs.readFileSync("src/routes/__root.tsx", "utf8");

root = root.replace(
    /className="hidden items-center gap-6 text-\[11px\] font-bold tracking-widest lg:flex uppercase"/,
    `className="nav-tour hidden items-center gap-6 text-[11px] font-bold tracking-widest lg:flex uppercase"`
);

root = root.replace(
    /<Link to="\/profile" className="hidden sm:block">/,
    `<Link to="/profile" className="profile-tour hidden sm:block">`
);

root = root.replace(
    /className="relative transition-colors hover:text-primary"/,
    `className="cart-tour relative transition-colors hover:text-primary"`
);

root = root.replace(
    /className="transition-colors hover:text-primary text-primary flex items-center gap-1"/,
    `className="install-tour transition-colors hover:text-primary text-primary flex items-center gap-1"`
);

if (!root.includes("import { GuidedTour }")) {
    root = root.replace(/import \{ copy \} from "\.\.\/lib\/i18n";/, `import { copy } from "../lib/i18n";\nimport { GuidedTour } from "../components/GuidedTour";`);
    root = root.replace(/<Outlet \/>\s*<\/main>/, `<Outlet />\n        <GuidedTour />\n      </main>`);
}

fs.writeFileSync("src/routes/__root.tsx", root);
