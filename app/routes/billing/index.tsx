import { requireAuthentication } from "~/services/auth.server";
import { Form, useLoaderData, type LoaderFunctionArgs } from "react-router";
import AddFunds from "~/components/extensions/addFunds";
import { getWalletBalance } from "~/operations/getWalletBalance";
import { Divider } from "~/components/base/divider";
import { Strong } from "~/components/base/text";
import { getOrderHistory } from "~/operations/getOrderHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/base/table";
import clsx from "clsx";
import { SquarePaymentStatus } from "@prisma/client";
import { formatMoney } from "~/helpers/formatMoney";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuthentication(request);

  const walletAmt = await getWalletBalance(user.id);
  const transactionHistory = await getOrderHistory(user.id);

  return {
    walletAmt,
    transactionHistory,
  };
}

export default function Billing() {
  const { walletAmt, transactionHistory } = useLoaderData<typeof loader>();

  return (
    <div className="">
      <Form method="POST" action="order/create">
        <AddFunds walletAmt={walletAmt} />
      </Form>
      <Divider className="mb-6" />
      <div>
        <Strong className="text-lg mb-2">Order History</Strong>
        <div className="">
          <Table>
            <TableHead>
              <TableHeader>Description</TableHeader>
              <TableHeader>Ordered At</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Amount</TableHeader>
            </TableHead>
            <TableBody>
              {transactionHistory.map((transaction) => {
                const positiveTrx = transaction.amount > 0;
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.note}</TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        transaction.status === SquarePaymentStatus.PENDING
                          ? "text-yellow-500"
                          : transaction.status === SquarePaymentStatus.COMPLETED
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {transaction.status}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        positiveTrx ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {`${positiveTrx ? "+" : "-"}$${formatMoney(
                        Math.abs(transaction.amount)
                      )}`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
