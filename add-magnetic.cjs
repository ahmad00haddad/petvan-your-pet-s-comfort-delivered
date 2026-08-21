
const fs = require("fs");

function addMagnetic(file, buttonRegex) {
    if (!fs.existsSync(file)) return;
    let code = fs.readFileSync(file, "utf8");
    if (!code.includes("import { Magnetic }")) {
        code = `import { Magnetic } from "../../components/Magnetic";\n` + code;
    }
    // Replace the button with <Magnetic><button.../></Magnetic>
    code = code.replace(buttonRegex, `<Magnetic className="w-full">$&</Magnetic>`);
    fs.writeFileSync(file, code);
}

// 1. Book Now
addMagnetic("src/routes/services/book.tsx", /<button\s+type="submit"[^>]*>[\s\S]*?<\/button>/);

// 2. Login
let login = fs.readFileSync("src/routes/login.tsx", "utf8");
if (!login.includes("import { Magnetic }")) {
    login = `import { Magnetic } from "../components/Magnetic";\n` + login;
    login = login.replace(/<button\s+type="submit"[^>]*>[\s\S]*?<\/button>/, `<Magnetic className="w-full">$&</Magnetic>`);
    fs.writeFileSync("src/routes/login.tsx", login);
}

// 3. Register
let reg = fs.readFileSync("src/routes/register.tsx", "utf8");
if (!reg.includes("import { Magnetic }")) {
    reg = `import { Magnetic } from "../components/Magnetic";\n` + reg;
    reg = reg.replace(/<button\s+type="submit"[^>]*>[\s\S]*?<\/button>/, `<Magnetic className="w-full">$&</Magnetic>`);
    fs.writeFileSync("src/routes/register.tsx", reg);
}

// 4. Install
let inst = fs.readFileSync("src/routes/install.tsx", "utf8");
if (!inst.includes("import { Magnetic }")) {
    inst = `import { Magnetic } from "../components/Magnetic";\n` + inst;
    inst = inst.replace(/<button\s+onClick=\{handleInstallClick\}[^>]*>[\s\S]*?<\/button>/, `<Magnetic className="w-full">$&</Magnetic>`);
    fs.writeFileSync("src/routes/install.tsx", inst);
}

