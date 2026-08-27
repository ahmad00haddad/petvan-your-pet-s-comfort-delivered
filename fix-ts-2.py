import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

cart = rd('src/routes/shop/cart.tsx')
if "import { vibrate }" not in cart:
    cart = cart.replace('import { toast } from "sonner";', 'import { toast } from "sonner";\nimport { vibrate } from "../../lib/utils";')
    rw('src/routes/shop/cart.tsx', cart)

book = rd('src/routes/services/book.tsx')
if "import { vibrate }" not in book:
    book = book.replace('import { toast } from "sonner";', 'import { toast } from "sonner";\nimport { vibrate } from "../../lib/utils";')
    rw('src/routes/services/book.tsx', book)
