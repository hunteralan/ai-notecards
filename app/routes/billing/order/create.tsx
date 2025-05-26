import {
  PaymentProvider,
  SquarePaymentStatus,
  TransactionType,
} from "@prisma/client";
import { redirect, type ActionFunctionArgs } from "react-router";
import { SquareClient, SquareEnvironment } from "square";
import { getPrismaClient } from "~/helpers/getPrismaClient";
import { requireAuthentication } from "~/services/auth.server";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.NODE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox, // or Environment.Production
});

export async function action({ request }: ActionFunctionArgs) {
  const idempotencyKey = crypto.randomUUID();
  const user = await requireAuthentication(request);

  const formData = await request.formData();
  const amount = parseInt(formData.get("add-amt")?.toString() ?? "0");

  const response = await client.checkout.paymentLinks.create({
    idempotencyKey, // For safety
    quickPay: {
      locationId: process.env.SQUARE_LOCATION_ID!,
      name: "Notecard Wallet",
      priceMoney: {
        amount: BigInt(amount * 100),
        currency: "USD",
      },
    },
    checkoutOptions: {
      redirectUrl: `${process.env.DEPLOYMENT_URL}/billing`,
    },
  });

  if (!!response.errors?.length) {
    return redirect("/billing", { status: 500 });
  }

  const prisma = getPrismaClient();
  await prisma.transaction.create({
    data: {
      providerKey: response.paymentLink?.orderId,
      amount,
      status: SquarePaymentStatus.PENDING,
      transactionType: TransactionType.CREDIT,
      user: {
        connect: {
          id: user.id,
        },
      },
      provider: PaymentProvider.SQUARE,
    },
  });

  return redirect(response.paymentLink?.url || "/billing");
}
