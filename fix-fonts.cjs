
const fs = require("fs");
let css = fs.readFileSync("src/styles.css", "utf8");

if (!css.includes("--font-cairo:")) {
    css = css.replace(/@theme inline \{/, 
        `@theme inline {\n  --font-poppins: "Poppins", sans-serif;\n  --font-cairo: "Cairo", sans-serif;\n  --font-display: "Poppins", "Cairo", sans-serif;`
    );
    fs.writeFileSync("src/styles.css", css);
}
