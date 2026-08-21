
const fs = require("fs");
let code = fs.readFileSync("src/routes/profile.tsx", "utf8");
code = code.replace(/\s*Add Pet\s*<\/button>/, "\n{t.addPet}\n</button>");
fs.writeFileSync("src/routes/profile.tsx", code);
