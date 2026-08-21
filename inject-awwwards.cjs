
const fs = require("fs");
let root = fs.readFileSync("src/routes/__root.tsx", "utf8");

if (!root.includes("import { CustomCursor }")) {
    root = root.replace(/import \{ GuidedTour \} from "\.\.\/components\/GuidedTour";/, 
        `import { GuidedTour } from "../components/GuidedTour";\nimport { CustomCursor } from "../components/CustomCursor";\nimport { Preloader } from "../components/Preloader";\nimport { GrainOverlay } from "../components/GrainOverlay";`
    );
    
    root = root.replace(/<Outlet \/>/, 
        `<Preloader />\n        <CustomCursor />\n        <GrainOverlay />\n        <Outlet />`
    );
}

fs.writeFileSync("src/routes/__root.tsx", root);
