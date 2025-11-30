export const functionsBase = import.meta.env.VITE_FUNCTIONS_ENDPOINT;

export async function createDepositIntent(amount: number, phone: string) {
  const res = await fetch(`${functionsBase}/payments-create-deposit-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, phone })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
