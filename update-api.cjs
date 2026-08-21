
const fs = require("fs");
let code = fs.readFileSync("src/api/pets.ts", "utf8");

// We need to inject random images in addPetFn
const addPetLogic = `
    .handler(async ({ data }) => {
      let randomImage = "";
      if (data.type === "Cats") {
        const catImages = [
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
          "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800",
          "https://images.unsplash.com/photo-1614989647360-1e523f380fa0?w=800",
          "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800"
        ];
        randomImage = catImages[Math.floor(Math.random() * catImages.length)];
      } else if (data.type === "Dogs") {
        const dogImages = [
          "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
          "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
          "https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=800",
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800"
        ];
        randomImage = dogImages[Math.floor(Math.random() * dogImages.length)];
      } else if (data.type === "Birds") {
        randomImage = "https://images.unsplash.com/photo-1552728089-57169ab0065c?w=800";
      } else {
        randomImage = "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800";
      }

      return await prisma.pet.create({
        data: {
          name: data.name,
          type: data.type,
          gender: data.gender,
          ownerId: data.userId,
          image: randomImage,
        },
      });
`;

code = code.replace(/\.handler\(async \(\{ data \}\) => \{[^]*?ownerId: data\.userId,\s*\},\s*\}\);\s*\}\)/, addPetLogic + "    })");

fs.writeFileSync("src/api/pets.ts", code);
console.log("pets API updated");
