import { type ActionFunctionArgs } from "react-router";
import { getPrismaClient } from "~/helpers/getPrismaClient";
import type { SquarePaymentUpdatedBody } from "~/types/squarePaymentUpdatedBody";

export async function action({ request }: ActionFunctionArgs) {
  const body: SquarePaymentUpdatedBody = await request.json();
  const prisma = getPrismaClient();

  const orderKey = body.data.object.payment.order_id;

  try {
    await prisma.transaction.update({
      where: { providerKey: orderKey },
      data: {
        status: body.data.object.payment.status,
      },
    });
  } catch {
    console.warn(`Tried updating nonexistent order: ${orderKey}`);
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 200 });
}
