import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

r = rd('src/routes/__root.tsx')
r = r.replace('import Magnetic from "../components/Magnetic";', 'import { Magnetic } from "../components/Magnetic";')
rw('src/routes/__root.tsx', r)

a = rd('src/routes/adopt/index.tsx')
a = a.replace('import ScrambleText from "../../components/ScrambleText";', 'import { ScrambleText } from "../../components/ScrambleText";')
rw('src/routes/adopt/index.tsx', a)

s = rd('src/routes/shop/index.tsx')
s = s.replace('import SpotlightCard from "../../components/SpotlightCard";', 'import { SpotlightCard } from "../../components/SpotlightCard";')
# Fix duplicate identifier (maybe it was already imported?)
if s.count('import { SpotlightCard') > 1:
    s = s.replace('import { SpotlightCard } from "../../components/SpotlightCard";\n', '', 1)
rw('src/routes/shop/index.tsx', s)