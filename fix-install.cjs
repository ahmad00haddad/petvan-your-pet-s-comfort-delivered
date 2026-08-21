
const fs = require("fs");
let content = fs.readFileSync("src/routes/install.tsx", "utf8");
content = content.replace(/function InstallPage\(\) \{/, "function InstallPage() {\n  const lang = useAppStore((state: any) => state.lang);\n  const t = copy[lang];");

// While at it, make sure iOS steps use translations completely
content = content.replace(/<p className="font-bold">Tap the Share button<\/p>/, "<p className=\\"font-bold\\">{t.iosStep1}</p>");
content = content.replace(/<p className="text-sm text-muted-foreground mt-1">\s*Look for the share icon at the bottom of your Safari browser\.\s*<\/p>/, "");
content = content.replace(/<p className="font-bold">Tap \\"Add to Home Screen\\".*?<\/p>/, "<p className=\\"font-bold\\">{t.iosStep2}</p>");
content = content.replace(/<p className="text-sm text-muted-foreground mt-1">\s*Scroll down the list of actions and tap this option\.\s*<\/p>/, "");
content = content.replace(/<span className="font-medium">Add to Home Screen<\/span>/, "<span className=\\"font-medium\\">{t.iosStep2}<\/span>");
content = content.replace(/Back to Home/, "{t.goBackHome}");

fs.writeFileSync("src/routes/install.tsx", content);
