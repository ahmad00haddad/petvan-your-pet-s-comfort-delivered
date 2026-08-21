const fs = require('fs');
const path = require('path');

const files = [
  'src/routes/__root.tsx',
  path.join('src', 'routes', 'pets', '$petId.tsx'),
  'src/routes/services/book.tsx',
  'src/routes/shop/index.tsx',
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f, content.replace(/\r\n/g, '\n'), 'utf8');
  console.log(`Converted ${f} to LF`);
});
