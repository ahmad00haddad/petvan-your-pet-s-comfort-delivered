const fs = require('fs');
let code = fs.readFileSync('src/routes/shop/cart.tsx', 'utf8');

if (!code.includes('const t = copy[lang];')) {
  code = code.replace(
    '  const cart = useAppStore((state) => state.cart);',
    '  const cart = useAppStore((state) => state.cart);\n  const lang = useAppStore((state) => state.lang);\n  const t = copy[lang];'
  );
  code = code.replace(
    'import { toast } from "sonner";',
    'import { toast } from "sonner";\nimport { copy } from "../../lib/i18n";'
  );
}

code = code.replace(/← Pet Shop/g, '← {t.petShop}');
code = code.replace(/<h1 className="[^"]*">Your Cart<\/h1>/g, (m) => m.replace('Your Cart', '{t.cart}'));
code = code.replace(/>Your Cart is Empty</g, '>{t.cartEmpty}<');
code = code.replace(/>\s*Looks like you haven't added anything to your cart yet\.\s*</g, '>\n            {t.cartEmptyDesc}\n          <');
code = code.replace(/>\s*Browse Products\s*</g, '>\n            {t.browseProducts}\n          <');
code = code.replace(/>Order Summary</g, '>{t.orderSummary}<');
code = code.replace(/>Subtotal</g, '>{t.subtotal}<');
code = code.replace(/>Delivery</g, '>{t.delivery}<');
code = code.replace(/>Free</g, '>{t.free}<');
code = code.replace(/>Total</g, '>{t.total}<');
code = code.replace(/>\s*Proceed to Checkout\s*</g, '>\n                  {t.proceedCheckout}\n                <');

fs.writeFileSync('src/routes/shop/cart.tsx', code);
console.log('shop/cart.tsx updated');
