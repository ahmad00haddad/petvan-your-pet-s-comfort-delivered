import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";

export const getMyOrdersFn = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    const orders = await prisma.order.findMany({
      where: { userId },
    });
    // Sort descending by implicit creation (array order)
    return orders.reverse();
  });
