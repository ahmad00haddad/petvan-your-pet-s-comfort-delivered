import { createServerFn } from "@tanstack/react-start";
import { prisma } from "../lib/prisma";

export const bookServiceFn = createServerFn({ method: "POST" })
  .validator((data: { userId: string; serviceType: string; total: number }) => data)
  .handler(async ({ data }) => {
    // Generate a simulated ETA (15 to 45 minutes from now)
    const etaMinutes = Math.floor(Math.random() * 30) + 15;
    const eta = new Date(Date.now() + etaMinutes * 60000);
    const drivers = ["Dr. Ahmad Haddad", "Dr. Sarah", "Groomer Khaled"];
    const driver = drivers[Math.floor(Math.random() * drivers.length)];

    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        type: "SERVICE",
        serviceType: data.serviceType,
        total: data.total,
        status: "PENDING",
        driverName: driver,
        eta: eta,
      }
    });
    return order;
  });

export const getOrderFn = createServerFn({ method: "GET" })
  .validator((orderId: string) => orderId)
  .handler(async ({ data: orderId }) => {
    return await prisma.order.findUnique({
      where: { id: orderId }
    });
  });
