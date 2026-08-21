
const fs = require("fs");
let code = fs.readFileSync("src/routes/adopt/index.tsx", "utf8");

code = code.replace(
  /className="w-full h-full object-cover"/g,
  `className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"`
);

fs.writeFileSync("src/routes/adopt/index.tsx", code);
console.log("adopt interactions enhanced");
