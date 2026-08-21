
const fs = require("fs");

function rep(file, search, replaceStr) {
    let code = fs.readFileSync(file, "utf8");
    code = code.replace(search, replaceStr);
    fs.writeFileSync(file, code);
}

// Ensure login.tsx has t
let login = fs.readFileSync("src/routes/login.tsx", "utf8");
if (!login.includes("const lang = ")) {
    login = "import { useAppStore } from \\"../lib/store\\";\\nimport { copy } from \\"../lib/i18n\\";\\n" + login;
    login = login.replace(/function Login\(\) \{/, "function Login() {\\n  const lang = useAppStore((state: any) => state.lang);\\n  const t = copy[lang];");
}
login = login.replace(/Enter your details to access your account/, "{t.welcomeBackDesc}");
login = login.replace(/<label[^>]*>\\s*Email\\s*<\\/label>/, "<label className=\\"text-sm font-medium leading-none\\" htmlFor=\\"email\\\">{t.emailAddress}</label>");
login = login.replace(/<label[^>]*>\\s*Password\\s*<\\/label>/, "<label className=\\"text-sm font-medium leading-none\\" htmlFor=\\"password\\\">{t.password}</label>");
login = login.replace(/\\{loading \\? \\"Signing in\.\.\.\\" : \\"Sign in\\"\\}/, "{loading ? t.signingIn : t.signIn}");
login = login.replace(/Don't have an account\?\\s*\\{" "\\}/, "{t.noAccount} {\\" \\"}");
login = login.replace(/>\\s*Sign up\\s*<\\/Link>/, ">{t.signUp}</Link>");
login = login.replace(/>\\s*Home\\s*<\\/Link>/, ">{t.goBackHome}</Link>");
fs.writeFileSync("src/routes/login.tsx", login);

// Ensure register.tsx has t
let reg = fs.readFileSync("src/routes/register.tsx", "utf8");
if (!reg.includes("const lang = ")) {
    reg = "import { useAppStore } from \\"../lib/store\\";\\nimport { copy } from \\"../lib/i18n\\";\\n" + reg;
    reg = reg.replace(/function Register\(\) \{/, "function Register() {\\n  const lang = useAppStore((state: any) => state.lang);\\n  const t = copy[lang];");
}
reg = reg.replace(/Join PetVan today and manage your pet's life\./, "{t.createAccountDesc}");
reg = reg.replace(/>\\s*Create Account\\s*</, ">{t.createAccount}<");
reg = reg.replace(/<label[^>]*>\\s*Full Name\\s*<\\/label>/, "<label className=\\"text-sm font-medium leading-none\\" htmlFor=\\"name\\\">{t.fullName}</label>");
reg = reg.replace(/<label[^>]*>\\s*Email\\s*<\\/label>/, "<label className=\\"text-sm font-medium leading-none\\" htmlFor=\\"email\\\">{t.emailAddress}</label>");
reg = reg.replace(/<label[^>]*>\\s*Password\\s*<\\/label>/, "<label className=\\"text-sm font-medium leading-none\\" htmlFor=\\"password\\\">{t.password}</label>");
reg = reg.replace(/\\{loading \\? \\"Signing up\.\.\.\\" : \\"Sign up\\"\\}/, "{loading ? t.signingUp : t.signUp}");
reg = reg.replace(/Already have an account\?\\s*\\{" "\\}/, "{t.alreadyHaveAccount} {\\" \\"}");
reg = reg.replace(/>\\s*Sign in\\s*<\\/Link>/, ">{t.signIn}</Link>");
reg = reg.replace(/>\\s*Home\\s*<\\/Link>/, ">{t.goBackHome}</Link>");
fs.writeFileSync("src/routes/register.tsx", reg);

// Ensure install.tsx has t
let inst = fs.readFileSync("src/routes/install.tsx", "utf8");
if (!inst.includes("const lang = ")) {
    inst = "import { useAppStore } from \\"../lib/store\\";\\nimport { copy } from \\"../lib/i18n\\";\\n" + inst;
    inst = inst.replace(/function Install\(\) \{/, "function Install() {\\n  const lang = useAppStore((state: any) => state.lang);\\n  const t = copy[lang];");
}
inst = inst.replace(/>\\s*Install PetVan\\s*</, ">{t.installApp}<");
inst = inst.replace(/Get the full app experience\\. Install PetVan on your home screen for faster access, offline\\s*mode, and push notifications\\./, "{t.installAppDesc}");
inst = inst.replace(/>\\s*Fast Installation\\s*</, ">{t.fastInstall}<");
inst = inst.replace(/>\\s*Home\\s*<\\/Link>/, ">{t.goBackHome}</Link>");
inst = inst.replace(/"Install App Now"/, "t.installNow");
inst = inst.replace(/"App is already installed"/, "t.alreadyInstalled");
inst = inst.replace(/>\\s*Apple iOS Installation\\s*</, ">{t.iosInstallTitle}<");
inst = inst.replace(/Safari doesn't support automatic installation\\. Follow these 2 easy steps:/, "{t.iosInstallDesc}");
inst = inst.replace(/Tap the Share button at the bottom of Safari/, "{t.iosStep1}");
inst = inst.replace(/Scroll down and tap 'Add to Home Screen'/, "{t.iosStep2}");
fs.writeFileSync("src/routes/install.tsx", inst);

