import os

def rd(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()

def rw(p, c):
    with open(p, 'w', encoding='utf-8') as f: f.write(c)

cart = rd('src/routes/shop/cart.tsx')

if 'key={total}' not in cart:
    cart = cart.replace(
        '<span className="text-xl font-black text-primary">{total.toFixed(2)} JOD</span>',
        '<span key={total} className="text-xl font-black text-primary animate-in zoom-in-75 duration-300">{total.toFixed(2)} JOD</span>'
    )
    rw('src/routes/shop/cart.tsx', cart)

print("Done cart")