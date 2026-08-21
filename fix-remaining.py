import re

# Fix register.tsx - remove duplicate value/onChange on password input
with open('src/routes/register.tsx', 'r', encoding='utf-8') as f:
    reg = f.read()

# Remove the bad second required value={password} onChange after the good one
reg = reg.replace(
    'id="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required value={password} onChange={(e) => setPassword(e.target.value)}',
    'id="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required'
)

with open('src/routes/register.tsx', 'w', encoding='utf-8') as f:
    f.write(reg)

# Fix Preloader.tsx - TS error on copy[lang]
with open('src/components/Preloader.tsx', 'r', encoding='utf-8') as f:
    preloader = f.read()

preloader = preloader.replace(
    'const t = copy[lang];',
    'const t = copy[lang as keyof typeof copy];'
)

with open('src/components/Preloader.tsx', 'w', encoding='utf-8') as f:
    f.write(preloader)

# Fix i18n.ts - check for remaining duplicate key error at line 285
with open('src/lib/i18n.ts', 'r', encoding='utf-8') as f:
    i18n = f.read()

# Check around line 285 for duplicate
lines = i18n.split('\n')
for i, line in enumerate(lines[280:290], start=281):
    print(f'L{i}: {line}')

print('Done')