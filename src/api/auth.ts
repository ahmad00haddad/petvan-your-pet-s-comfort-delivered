import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";

export const registerUserFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; name: string; password: string }) => data)
  .handler(async ({ data }) => {
    // In a real app, hash the password. For this demo we store it plain.
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password, // demo only
      },
    });

    return user;
  });

export const loginUserFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || user.password !== data.password) {
      throw new Error("Invalid credentials");
    }

    return user;
  });

export const getUserFn = createServerFn({ method: "GET" })
  .validator((userId: string | null) => userId)
  .handler(async ({ data: userId }) => {
    if (!userId) return null;
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  });
