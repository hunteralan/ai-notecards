export function formatMoney(amount: number): string {
  return Intl.NumberFormat("en-US", {
    currency: "usd",
    currencySign: "standard",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
