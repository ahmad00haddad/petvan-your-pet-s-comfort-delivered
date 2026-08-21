
const fs = require("fs");
let reg = fs.readFileSync("src/routes/register.tsx", "utf8");
if (!reg.includes("import { ContextHint }")) {
    reg = `import { ContextHint } from "../components/ContextHint";\n` + reg;
    
    // Find the Phone Number label and inject ContextHint
    reg = reg.replace(/<label htmlFor="phone" className="mb-2 block text-sm font-bold text-foreground">\s*Phone Number\s*<\/label>/, 
        `<label htmlFor="phone" className="mb-2 flex items-center text-sm font-bold text-foreground">Phone Number <ContextHint content={lang === "ar" ? "نحتاج رقم هاتفك للتواصل معك عند وصول العيادة المتنقلة." : "We need your phone number to contact you when the mobile clinic arrives."} /></label>`
    );
    
    fs.writeFileSync("src/routes/register.tsx", reg);
}
