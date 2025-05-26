import { getPrismaClient } from "~/helpers/getPrismaClient";
import { getWalletBalance } from "./getWalletBalance";
import { Prices } from "~/constants/prices";
import { SquarePaymentStatus, TransactionType } from "@prisma/client";
import { redirect } from "react-router";

export async function buyFlashcards(userId: number, numFlashcards: number) {
  const prisma = getPrismaClient();
  const walletAmt = await getWalletBalance(userId);

  const priceOfFlashcards = numFlashcards * Prices.FLASHCARD;

  if (walletAmt < priceOfFlashcards) {
    throw redirect(`/billing?error=INSUFFICIENT_FUNDS`, {
      status: 302,
    });
  }

  return await prisma.transaction.create({
    data: {
      userId,
      status: SquarePaymentStatus.PENDING,
      amount: -priceOfFlashcards,
      note: `Purchased ${numFlashcards} flashcards`,
      transactionType: TransactionType.DEBIT,
    },
  });
}
