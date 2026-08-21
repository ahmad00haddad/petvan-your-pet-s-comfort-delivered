
const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

const fixedParticles = `
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute size-2 rounded-full bg-primary/40 animate-float"
                style={{ 
                  top: \`\${20 + Math.random() * 60}%\`, 
                  left: \`\${20 + Math.random() * 60}%\`, 
                  animationDelay: \`\${i * 0.5}s\`,
                  animationDuration: \`\${3 + Math.random() * 2}s\`
                }}
              />
            ))}
          </div>
`;

// Use a regular expression that is guaranteed to grab this entire messed up block
index = index.replace(/\{\/\* Floating Particles \*\/\}[\s\S]*?animationDuration: \\s\s*\}\}\s*\/>\s*\)\)\}\s*<\/div>/, fixedParticles.trim());

fs.writeFileSync("src/routes/index.tsx", index);
