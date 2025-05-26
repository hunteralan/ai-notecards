import { getPrismaClient } from "~/helpers/getPrismaClient";
import { getWalletBalance } from "./getWalletBalance";
import { Prices } from "~/constants/prices";
import { SquarePaymentStatus, TransactionType } from "@prisma/client";
import { redirectWithError } from "remix-toast";

export async function buyFlashcards(userId: number, numFlashcards: number) {
  const prisma = getPrismaClient();
  const walletAmt = await getWalletBalance(userId);

  const priceOfFlashcards = numFlashcards * Prices.FLASHCARD;

  if (walletAmt < priceOfFlashcards) {
    throw await redirectWithError(
      `/billing`,
      "Insufficient wallet balance to purchase flashcards."
    );
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
