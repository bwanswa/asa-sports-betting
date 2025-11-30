import { useState } from "react";
import { createDepositIntent } from "../../lib/api";

export default function Deposit() {
  const [amount, setAmount] = useState(10000);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Processing...");
    try {
      const r = await createDepositIntent(amount, phone);
      setStatus(`Check your phone to approve payment. Ref: ${r.reference}`);
    } catch (err: any) {
      setStatus(`Failed: ${err.message}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold">Deposit via Mobile Money</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="input"
        placeholder="Amount (UGX)"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input"
        placeholder="Phone number (2567xxxxxxx)"
      />
      <button className="btn">Deposit</button>
      <p>{status}</p>
    </form>
  );
}
