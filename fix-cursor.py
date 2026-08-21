import os
import re

path = "src/components/CustomCursor.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# z-index 100 is too low. Some elements might have higher z-index (e.g. tooltips, popovers, navbars)
# Also mix-blend-screen on bright yellow over light backgrounds can make it invisible.
content = re.sub(r'z-\[100\] mix-blend-screen', r'z-[9999]', content)
content = re.sub(r'z-\[99\]', r'z-[9998]', content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)