import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

r = rd('src/routes/__root.tsx')
r = r.replace('import Lenis from "@studio-freight/lenis";', '// @ts-ignore\nimport Lenis from "@studio-freight/lenis";')
rw('src/routes/__root.tsx', r)