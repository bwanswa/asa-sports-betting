import React, {useEffect, useState} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import BetForm from "./BetForm";
import Wallet from "./Wallet";

export default function Dashboard(){
  const [user,setUser]=useState(null);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,u=>setUser(u));
    return unsub;
  },[]);

  if(!user) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <header style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
        <h2>Welcome, {user.email}</h2>
        <div>
          <button onClick={()=>signOut(auth)}>Sign Out</button>
        </div>
      </header>

      <main style={{display:"grid",gridTemplateColumns:"1fr 1fr", gap:20, marginTop:20}}>
        <div>
          <Wallet uid={user.uid}/>
          <BetForm uid={user.uid}/>
        </div>

        <div>
          <h3>Your Bets</h3>
          <p>(Fetch bets from Firestore or Cloud Function — omitted for brevity.)</p>
        </div>
      </main>
    </div>
  );
}
