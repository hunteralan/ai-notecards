import type { SquarePaymentStatus } from "@prisma/client";
import { getPrismaClient } from "~/helpers/getPrismaClient";

export async function setOrderStatus(
  orderId: number,
  status: SquarePaymentStatus
) {
  const prisma = getPrismaClient();

  try {
    await prisma.transaction.update({
      where: { id: orderId },
      data: { status },
    });
  } catch (error) {
    console.warn(`Tried updating nonexistent order: ${orderId}`);
    throw new Error(`Order with ID ${orderId} does not exist.`);
  }
}
