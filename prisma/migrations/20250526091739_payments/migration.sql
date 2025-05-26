-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('SQUARE');

-- CreateEnum
CREATE TYPE "SquarePaymentStatus" AS ENUM ('APPROVED', 'PENDING', 'COMPLETED', 'CANCELED', 'FAILED');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL(65,30) NOT NULL,
    "note" TEXT,
    "transactionType" "TransactionType" NOT NULL,
    "status" "SquarePaymentStatus" NOT NULL,
    "providerKey" TEXT,
    "provider" "PaymentProvider",
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_providerKey_key" ON "Transaction"("providerKey");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
