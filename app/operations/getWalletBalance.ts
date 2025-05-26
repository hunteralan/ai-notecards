import { SquarePaymentStatus } from "@prisma/client";
import { getPrismaClient } from "~/helpers/getPrismaClient";

export async function getWalletBalance(userId: number) {
  const prisma = getPrismaClient();

  const walletAmt = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      status: SquarePaymentStatus.COMPLETED,
    },
  });

  return walletAmt._sum.amount?.toNumber() || 0;
}
