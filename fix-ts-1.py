import os
import re

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

# Fix register.tsx duplicate attribute
reg = rd('src/routes/register.tsx')
reg = re.sub(r'type="email"\s+type=\{showPassword \? "text" : "password"\}', 'type="email"', reg)
reg = re.sub(r'type=\{showPassword \? "text" : "password"\}\s+type=\{showPassword \? "text" : "password"\}', 'type={showPassword ? "text" : "password"}', reg)
rw('src/routes/register.tsx', reg)

# Fix vibrate in cart.tsx
cart = rd('src/routes/shop/cart.tsx')
cart = cart.replace(
    'import { vibrate } from "../../lib/utils";\nimport { vibrate } from "../../lib/utils";',
    'import { vibrate } from "../../lib/utils";'
)
if "import { vibrate }" not in cart:
    cart = cart.replace('import { ShoppingBag', 'import { vibrate } from "../../lib/utils";\nimport { ShoppingBag')
rw('src/routes/shop/cart.tsx', cart)

# Also fix vibrate in book.tsx just in case
book = rd('src/routes/services/book.tsx')
book = book.replace(
    'import { vibrate } from "../../lib/utils";\nimport { vibrate } from "../../lib/utils";',
    'import { vibrate } from "../../lib/utils";'
)
rw('src/routes/services/book.tsx', book)