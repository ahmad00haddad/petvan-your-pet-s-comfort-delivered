
const fs = require("fs");
function fix(file) {
    if (!fs.existsSync(file)) return;
    let code = fs.readFileSync(file, "utf8");
    code = code.replace(/const lang = useAppStore\(\(state: any\) => state\.lang\);/, "const lang = useAppStore((state: any) => state.lang) as keyof typeof copy;");
    fs.writeFileSync(file, code);
}
fix("src/routes/install.tsx");
fix("src/routes/login.tsx");
fix("src/routes/register.tsx");
fix("src/components/GuidedTour.tsx");
