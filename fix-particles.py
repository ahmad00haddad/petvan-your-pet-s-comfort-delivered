import os
import re

path = "src/routes/index.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's completely replace the particles map block to ensure it's syntactically perfect.
content = re.sub(
    r'\{top:\s*.*?\n.*?left:\s*.*?\n.*?animationDelay:\s*.*?\n.*?animationDuration:\s*.*?\n\s*\}\}',
    r'{{ top: ${20 + Math.random() * 60}%, left: ${20 + Math.random() * 60}%, animationDelay: ${i * 0.5}s, animationDuration: ${3 + Math.random() * 2}s }}',
    content,
    flags=re.DOTALL
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)