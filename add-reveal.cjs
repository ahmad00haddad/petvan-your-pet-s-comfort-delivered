
const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

if (!index.includes("import { RevealOnScroll }")) {
    index = `import { RevealOnScroll } from "../components/RevealOnScroll";\n` + index;
    
    // Wrap services section
    index = index.replace(/<section id="services"[^>]*>[\s\S]*?(?=<\/section>)<\/section>/, (match) => {
        return `<RevealOnScroll>\n${match}\n</RevealOnScroll>`;
    });

    // Wrap adopt section grid
    index = index.replace(/<div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">[\s\S]*?(?=<\/div>\s*<\/section>)<\/div>/, (match) => {
        return `<RevealOnScroll delay={200}>\n${match}\n</RevealOnScroll>`;
    });

    fs.writeFileSync("src/routes/index.tsx", index);
}
