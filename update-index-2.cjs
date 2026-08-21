
const fs = require("fs");
let code = fs.readFileSync("src/routes/index.tsx", "utf8");

code = code.replace(/>\s*FIND YOUR BEST FRIEND\s*</g, "> {t.findFriend} <");
code = code.replace(/>\s*WE PUT YOUR PET'S NEED FIRST\s*</g, "> {t.askServicesSub} <");
code = code.replace(/>\s*Ask for services\s*</g, ">\n              {t.askServices}\n            <");
code = code.replace(/>\s*First place potential adopters turn to when looking to get a new pet\.\s*</g, ">\n              {t.adoptLead}\n            <");
code = code.replace(/>\s*CHOOSE WHAT YOU NEED WHENEVER YOU NEED\s*</g, "> {t.shopSub} <");
code = code.replace(/>Shop</g, ">{t.shop}<");

fs.writeFileSync("src/routes/index.tsx", code);
console.log("index.tsx more translated");
