import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

u = rd('src/lib/utils.ts')
u = u.replace('catch (e) {}', 'catch (e) { /* ignore */ }')
rw('src/lib/utils.ts', u)