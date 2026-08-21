
const fs = require("fs");
let index = fs.readFileSync("src/routes/index.tsx", "utf8");

index = index.replace(
    /top: \\%\\,/g,
    "top: `${20 + Math.random() * 60}%`,"
);
index = index.replace(
    /left: \\%\\,/g,
    "left: `${20 + Math.random() * 60}%`,"
);
index = index.replace(
    /animationDelay: \\s\\,/g,
    "animationDelay: `${i * 0.5}s`,"
);
index = index.replace(
    /animationDuration: \\s\\`/g,
    "animationDuration: `${3 + Math.random() * 2}s`"
);
// Make sure to clean up any weirdness. The best way is to just replace the whole section.
