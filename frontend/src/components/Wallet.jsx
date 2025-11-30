import React, {useState} from "react";
import axios from "axios";

export default function Wallet({uid}){
  const [amount,setAmount]=useState(1000);
  const [phone,setPhone]=useState("");

  async function topUp(provider){
    try{
      const resp = await axios.post('/api/initiate-payment', { uid, provider, amount, phone });
      alert("Payment initiated: " + (resp.data.message || JSON.stringify(resp.data)));
    }catch(err){
      console.error(err);
      alert("Payment failed: " + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div style={{border:"1px solid #ddd", padding:12, borderRadius:8}}>
      <h4>Wallet Top-up</h4>
      <input placeholder="+2567..." value={phone} onChange={e=>setPhone(e.target.value)} />
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      <div style={{marginTop:8}}>
        <button onClick={()=>topUp("mtn")}>Pay with MTN MoMo</button>
        <button onClick={()=>topUp("airtel")} style={{marginLeft:8}}>Pay with Airtel</button>
      </div>
    </div>
  );
}
