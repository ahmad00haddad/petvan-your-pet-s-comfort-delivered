import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";

export const getAdoptionsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await prisma.adoptionListing.findMany({
      where: { status: "AVAILABLE" },
      include: {
        pet: true,
        lister: {
          select: { name: true }
        }
      }
    });
  });

export const listForAdoptionFn = createServerFn({ method: "POST" })
  .validator((data: { userId: string; petId: string; description: string }) => data)
  .handler(async ({ data }) => {
    const pet = await prisma.pet.findUnique({ where: { id: data.petId } });
    if (!pet || pet.ownerId !== data.userId) throw new Error("Unauthorized");

    return await prisma.adoptionListing.upsert({
      where: { petId: data.petId },
      create: {
        petId: data.petId,
        listerId: data.userId,
        description: data.description,
      },
      update: {
        description: data.description,
        status: "AVAILABLE"
      }
    });
  });
