"use client";

import { Button } from "../base/button";
import { Strong, Text } from "../base/text";
import { Input } from "../base/input";
import { useState } from "react";

type Props = {
  walletAmt: number;
};

export default function AddFunds({ walletAmt }: Props) {
  const [addAmt, setAddAmt] = useState(0);
  return (
    <section
      aria-labelledby="summary-heading"
      className="px-4 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0"
    >
      <div className="mx-auto max-w-lg lg:max-w-none">
        <h2
          id="summary-heading"
          className="text-lg flex justify-between font-medium text-gray-900"
        >
          <Text>Wallet</Text>
          <Strong>${walletAmt.toFixed(2)}</Strong>
        </h2>

        <div className="mt-6 mb-6">
          <label
            htmlFor="email-address"
            className="block text-sm/6 font-medium text-gray-700"
          >
            <Text>Add Funds</Text>
          </label>
          <div className="mt-2 flex items-center gap-2">
            <Input
              min={0}
              placeholder="$0.00"
              value={addAmt}
              id="add-amt"
              name="add-amt"
              type="number"
              className="block w-full rounded-md text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
              onChange={(e) => setAddAmt(parseInt(e.target.value))}
            />
            <Button
              disabled={addAmt <= 0}
              type="submit"
              color="green"
              className="whitespace-nowrap"
            >
              Add Funds
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
