import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";

export const getMyPetsFn = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    return await prisma.pet.findMany({
      where: { ownerId: userId },
    });
  });

export const addPetFn = createServerFn({ method: "POST" })
  .validator((data: { userId: string; name: string; type: string; gender: string }) => data)
  .handler(async ({ data }) => {
    return await prisma.pet.create({
      data: {
        name: data.name,
        type: data.type,
        gender: data.gender,
        ownerId: data.userId,
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
