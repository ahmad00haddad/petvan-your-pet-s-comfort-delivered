import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

s = rd('prisma/schema.prisma')
s = s.replace(
    'datasource db {\n  provider = "sqlite"\n  url      = env("DATABASE_URL")\n}',
    'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}'
)
rw('prisma/schema.prisma', s)
print("Updated schema to postgresql")