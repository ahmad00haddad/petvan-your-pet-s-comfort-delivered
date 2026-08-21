
const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

// Fixing the backslash escapes that messed up the template literal
index = index.replace(
    /top: `\$\{20 \+ Math\.random\(\) \* 60\}%`,/g,
    `top: \`\${20 + Math.random() * 60}%\`,`
);
index = index.replace(
    /left: `\$\{20 \+ Math\.random\(\) \* 60\}%`,/g,
    `left: \`\${20 + Math.random() * 60}%\`,`
);
index = index.replace(
    /animationDelay: `\$\{i \* 0\.5\}s`,/g,
    `animationDelay: \`\${i * 0.5}s\`,`
);
index = index.replace(
    /animationDuration: `\$\{3 \+ Math\.random\(\) \* 2\}s`/g,
    `animationDuration: \`\${3 + Math.random() * 2}s\``
);

fs.writeFileSync("src/routes/index.tsx", index);
