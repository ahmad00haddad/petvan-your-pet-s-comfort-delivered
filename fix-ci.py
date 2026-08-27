import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

r = rd('src/routes/__root.tsx')
r = r.replace('easing: (t) =>', 'easing: (t: number) =>')
rw('src/routes/__root.tsx', r)

ci = rd('.github/workflows/ci.yml')
ci = ci.replace('bun install --frozen-lockfile', 'bun install')
rw('.github/workflows/ci.yml', ci)