import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";

export const getProductsFn = createServerFn({ method: "GET" }).handler(async () => {
  return await prisma.product.findMany();
});

export const checkoutFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      userId: string;
      items: { productId: string; quantity: number; price: number }[];
      total: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        type: "SHOP",
        status: "PAID",
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    return order;
  });
