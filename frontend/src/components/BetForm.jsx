import React, {useState} from "react";
import axios from "axios";

export default function BetForm({uid}){
  const [amount,setAmount]=useState(100);
  const [selection,setSelection]=useState("");

  async function place(){
    try{
      // Example: write a bet document or call a function to place a bet
      const res = await axios.post('/api/place-bet', { uid, amount, selection });
      alert('Bet placed: ' + (res.data.message || 'ok'));
    }catch(e){
      alert(e.response?.data?.error || e.message);
    }
  }

  return (
    <div style={{border:"1px solid #ddd", padding:12, borderRadius:8, marginTop:12}}>
      <h4>Place Bet</h4>
      <input placeholder="Selection (e.g. Team A)" value={selection} onChange={e=>setSelection(e.target.value)} />
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      <div style={{marginTop:8}}>
        <button onClick={place}>Place Bet</button>
      </div>
    </div>
  );
}
