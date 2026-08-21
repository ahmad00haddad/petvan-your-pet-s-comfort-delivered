import os
import re

cart_path = "src/routes/shop/cart.tsx"
with open(cart_path, "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(
    r'<ShoppingCart className="size-16 text-primary-foreground" />',
    r'<div className="relative">\n              <ShoppingCart className="size-16 text-primary-foreground animate-bounce" />\n              <span className="absolute -top-2 -right-2 text-2xl animate-pulse">😢</span>\n            </div>',
    content
)

content = re.sub(
    r'<p className="mb-8 text-muted-foreground">\{t\.cartEmptyDesc\}</p>',
    r'<p className="mb-8 text-muted-foreground">{lang === "ar" ? "طبق حيوانك فارغ! دعه يتذوق بعض المكافآت من المتجر." : "Your pet\'s bowl is empty! Let\'s find some treats in the shop."}</p>',
    content
)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(content)