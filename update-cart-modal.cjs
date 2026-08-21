
const fs = require("fs");

let i18nCode = fs.readFileSync("src/lib/i18n.ts", "utf8");
const addEn = `
    checkoutDetails: "Checkout Details",
    enterDelivery: "Please enter your delivery details to complete your order of",
    itemsWord: "items",
    deliveryAddress: "Delivery Address",
    phoneNumber: "Phone Number",
    paymentMethod: "Payment Method",
    cashOnDelivery: "Cash on Delivery",
    totalToPay: "Total to pay",
    processing: "Processing...",
    confirmPayment: "Confirm Payment",
`;
const addAr = `
    checkoutDetails: "تفاصيل الدفع",
    enterDelivery: "يرجى إدخال تفاصيل التوصيل لإكمال طلبك المكون من",
    itemsWord: "عناصر",
    deliveryAddress: "عنوان التوصيل",
    phoneNumber: "رقم الهاتف",
    paymentMethod: "طريقة الدفع",
    cashOnDelivery: "الدفع عند الاستلام",
    totalToPay: "الإجمالي للدفع",
    processing: "جاري المعالجة...",
    confirmPayment: "تأكيد الدفع",
`;
i18nCode = i18nCode.replace(/(otherWord:\s*"Other",)/, `$1\n${addEn}`);
i18nCode = i18nCode.replace(/(otherWord:\s*"أخرى",)/, `$1\n${addAr}`);
fs.writeFileSync("src/lib/i18n.ts", i18nCode);

let cartCode = fs.readFileSync("src/routes/shop/cart.tsx", "utf8");
cartCode = cartCode.replace(/>Checkout Details</g, ">{t.checkoutDetails}<");
cartCode = cartCode.replace(
  /Please enter your delivery details to complete your order of <strong>\{cart\.length\}<\/strong> items\./g, 
  "{t.enterDelivery} <strong>{cart.length}</strong> {t.itemsWord}."
);
cartCode = cartCode.replace(/>Delivery Address</g, ">{t.deliveryAddress}<");
cartCode = cartCode.replace(/>Phone Number</g, ">{t.phoneNumber}<");
cartCode = cartCode.replace(/>Payment Method</g, ">{t.paymentMethod}<");
cartCode = cartCode.replace(/>Cash on Delivery</g, ">{t.cashOnDelivery}<");
cartCode = cartCode.replace(/>Total to pay</g, ">{t.totalToPay}<");
cartCode = cartCode.replace(/>Cancel</g, ">{t.cancel}<");
cartCode = cartCode.replace(/"Processing\.\.\."/g, "t.processing");
cartCode = cartCode.replace(/"Confirm Payment"/g, "t.confirmPayment");
fs.writeFileSync("src/routes/shop/cart.tsx", cartCode);
console.log("done");
