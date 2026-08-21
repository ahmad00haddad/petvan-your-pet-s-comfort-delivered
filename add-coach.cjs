
const fs = require("fs");
let reg = fs.readFileSync("src/routes/register.tsx", "utf8");

if (!reg.includes("function PasswordCoach")) {
    const coachComponent = `\nfunction PasswordCoach({ password }: { password: string }) {
  const lang = useAppStore((state: any) => state.lang);
  if (!password) return null;
  const hasNum = /\\d/.test(password);
  const hasLen = password.length >= 8;
  const isSecure = hasNum && hasLen;
  return (
    <div className="mt-2 flex items-center gap-2 text-xs transition-all duration-300">
      <div className={\`h-1 flex-1 rounded-full \${hasLen ? "bg-primary" : "bg-border"}\`} />
      <div className={\`h-1 flex-1 rounded-full \${hasNum ? "bg-primary" : "bg-border"}\`} />
      <span className={\`ml-2 font-bold \${isSecure ? "text-primary" : "text-muted-foreground"}\`}>
        {isSecure 
          ? (lang === "ar" ? "كلمة المرور قوية!" : "Highly secure!") 
          : (lang === "ar" ? "أضف رقماً وحروفاً أكثر" : "Add a number and more chars")}
      </span>
    </div>
  );
}\n`;
    
    reg = reg.replace(/export const Route/, coachComponent + "\nexport const Route");
    reg = reg.replace(
        /<input\s+id="password"\s+type="password"\s+required\s+className="w-full.*?bg-transparent[^>]*\/>/g,
        `$&\n            <PasswordCoach password={e.currentTarget.parentElement?.querySelector("input")?.value || ""} />`
    );
    // Actually getting state in real time is better using onChange.
    // I will just use a state for password!
    reg = reg.replace(/const \[loading, setLoading\] = useState\(false\);/, `const [loading, setLoading] = useState(false);\n  const [pass, setPass] = useState("");`);
    reg = reg.replace(/id="password"\s+type="password"/, `id="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)}`);
    reg = reg.replace(/<PasswordCoach password=\{.*?\} \/>/, `<PasswordCoach password={pass} />`);
    
    fs.writeFileSync("src/routes/register.tsx", reg);
}
