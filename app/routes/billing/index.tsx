import { getPrismaClient } from "~/helpers/getPrismaClient";
import { requireAuthentication } from "~/services/auth.server";
import { Form, useLoaderData, type LoaderFunctionArgs } from "react-router";
import AddFunds from "~/components/extensions/addFunds";
import { SquarePaymentStatus } from "@prisma/client";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthentication(request);
  const prisma = getPrismaClient();

  const walletAmt = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId: user.id,
      status: SquarePaymentStatus.COMPLETED,
    },
  });

  return {
    walletAmt: walletAmt._sum.amount?.toNumber() || 0,
  };
}

export default function Billing() {
  const { walletAmt } = useLoaderData<typeof loader>();
  return (
    <div className="">
      <Form method="POST" action="order/create">
        <AddFunds walletAmt={walletAmt} />
      </Form>
    </div>
  );
}
