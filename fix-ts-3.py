import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

reg = rd('src/routes/register.tsx')
reg = reg.replace('type={showPassword ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)}', 'type={showPassword ? "text" : "password"}')
rw('src/routes/register.tsx', reg)