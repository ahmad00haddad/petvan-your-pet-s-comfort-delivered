import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";

export const getMyPetsFn = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    return await prisma.pet.findMany({
      where: { ownerId: userId },
    });
  });

export const getPetByIdFn = createServerFn({ method: "GET" })
  .validator((petId: string) => petId)
  .handler(async ({ data: petId }) => {
    return await prisma.pet.findUnique({
      where: { id: petId },
    });
  });

export const addPetFn = createServerFn({ method: "POST" })
  .validator((data: { userId: string; name: string; type: string; gender: string }) => data)
  
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
    });

export const deletePetFn = createServerFn({ method: "POST" })
  .validator((data: { userId: string; petId: string }) => data)
  .handler(async ({ data }) => {
    const pet = await prisma.pet.findUnique({ where: { id: data.petId } });
    if (!pet || pet.ownerId !== data.userId) throw new Error("Unauthorized");
    return await prisma.pet.delete({ where: { id: data.petId } });
  });
