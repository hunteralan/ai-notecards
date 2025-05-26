import { getPrismaClient } from "~/helpers/getPrismaClient";

export async function getOrderHistory(userId: number) {
  const prisma = getPrismaClient();

  const orders = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      amount: true,
      note: true,
      createdAt: true,
      transactionType: true,
      status: true,
    },
    where: {
      userId,
    },
  });

  return orders.map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
    amount: order.amount.toNumber(),
  }));
}
