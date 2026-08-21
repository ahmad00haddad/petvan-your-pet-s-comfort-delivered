
const fs = require("fs");
const path = require("path");

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith(".tsx")) {
            results.push(file);
        }
    });
    return results;
}

const files = walk("src");
let found = false;
files.forEach(file => {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
        // Look for typical hardcoded JSX strings like >Text< or > Text <
        if (line.match(/>\s*[A-Z][a-zA-Z0-9 ,.!?"\'-]+\s*</) && !line.includes("className")) {
            console.log(`${file}:${i + 1}: ${line.trim()}`);
            found = true;
        }
    });
});
if (!found) console.log("No hardcoded strings found.");
