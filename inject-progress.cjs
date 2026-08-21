
const fs = require("fs");
let root = fs.readFileSync("src/routes/__root.tsx", "utf8");

if (!root.includes("import { ScrollProgress }")) {
    root = root.replace(/import \{ Preloader \} from "\.\.\/components\/Preloader";/, 
        `import { Preloader } from "../components/Preloader";\nimport { ScrollProgress } from "../components/ScrollProgress";`
    );
    
    root = root.replace(/<Preloader \/>/, 
        `<Preloader />\n        <ScrollProgress />`
    );
}

fs.writeFileSync("src/routes/__root.tsx", root);
