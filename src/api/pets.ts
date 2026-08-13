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
