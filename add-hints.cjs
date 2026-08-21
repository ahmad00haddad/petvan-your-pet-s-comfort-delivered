
const fs = require("fs");

let book = fs.readFileSync("src/routes/services/book.tsx", "utf8");
if (!book.includes("import { ContextHint }")) {
    book = `import { ContextHint } from "../../components/ContextHint";\n` + book;
    book = book.replace(/<h2 className="font-display text-xl font-bold">Total: \{selected\.price\.toFixed\(2\)\} JOD<\/h2>/, 
        `<h2 className="font-display text-xl font-bold flex items-center">Total: {selected.price.toFixed(2)} JOD\n            <ContextHint content={lang === "ar" ? "سيتم دفع المبلغ الإجمالي نقداً عند وصول العيادة المتنقلة." : "Total amount will be paid in cash upon the arrival of the mobile clinic."} />\n          </h2>`
    );
    fs.writeFileSync("src/routes/services/book.tsx", book);
}

let cart = fs.readFileSync("src/routes/shop/cart.tsx", "utf8");
if (!cart.includes("import { ContextHint }")) {
    cart = `import { ContextHint } from "../../components/ContextHint";\n` + cart;
    cart = cart.replace(/<div className="font-display text-2xl font-bold flex items-center justify-between">/, 
        `<div className="font-display text-2xl font-bold flex items-center justify-between">\n              <div className="flex items-center">\n                {t.total}\n                <ContextHint content={lang === "ar" ? "السعر يشمل ضريبة القيمة المضافة ورسوم التوصيل." : "Price includes VAT and delivery fees."} />\n              </div>`
    );
    cart = cart.replace(/<span>\{t\.total\}<\/span>/, ""); // Remove the original Total span since I moved it inside the div
    fs.writeFileSync("src/routes/shop/cart.tsx", cart);
}
