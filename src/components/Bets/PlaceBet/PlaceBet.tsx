import { useState } from "react";

export default function PlaceBet({ eventId, market, selection, odds }: {
  eventId: string; market: string; selection: string; odds: number;
}) {
  const [stake, setStake] = useState(5000);
  const [message, setMessage] = useState("");

  async function submit() {
    setMessage("Bet placed (mock). Potential payout UG