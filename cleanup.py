import os
import json

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

r = rd('src/routes/__root.tsx')
r = r.replace('// @ts-ignore\nimport Lenis', '// @ts-expect-error\nimport Lenis')
rw('src/routes/__root.tsx', r)

# Remove prisma dependencies
p = json.loads(rd('package.json'))
if 'dependencies' in p:
    p['dependencies'].pop('@prisma/client', None)
    p['dependencies'].pop('@prisma/adapter-libsql', None)
    p['dependencies'].pop('@libsql/client', None)
    p['dependencies'].pop('prisma', None)
if 'devDependencies' in p:
    p['devDependencies'].pop('prisma', None)

rw('package.json', json.dumps(p, indent=2) + '\n')

# Delete prisma folder
import shutil
if os.path.exists('prisma'):
    shutil.rmtree('prisma')

print("Prisma removed and ts-expect-error fixed.")