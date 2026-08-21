
const fs = require("fs");
let code = fs.readFileSync("src/routes/index.tsx", "utf8");

code = code.replace(
  /The first mobile caravan specialized in pets in Jordan, specialized in providing\s*treatment and care for them\./,
  "{t.heroDesc}"
);
code = code.replace(/Choose the kind of pet you want to adopt\./, "{t.chooseAdopt}");
code = code.replace(/Choose the kind of pet you own\./, "{t.chooseKind}");
code = code.replace(/Hello, Cat Lover! \?\?/, "{t.hello} {t.kinds.Cats} {t.friend}");
code = code.replace(/Hey, Dog Parent! \?\?/, "{t.hello} {t.kinds.Dogs} {t.friend}");
code = code.replace(/Tweet Tweet! \?\?/, "{t.hello} {t.kinds.Birds} {t.friend}");
code = code.replace(/Glub Glub! \?\?/, "{t.hello} {t.kinds.Fish} {t.friend}");
code = code.replace(/Hello, my friend!/, "{t.hello} {t.friend}");
code = code.replace(/>Profile</, ">{t.profile}<");
code = code.replace(/>Login</, ">{t.login}<");
code = code.replace(/>Register</, ">{t.register}<");

fs.writeFileSync("src/routes/index.tsx", code);
console.log("index.tsx translated");
