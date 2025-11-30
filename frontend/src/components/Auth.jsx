import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Auth(){
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  async function register(){
    try {
      await createUserWithEmailAndPassword(auth,email,password);
      nav("/dashboard");
    } catch(e){
      alert(e.message);
    }
  }

  async function login() {
    try {
      await signInWithEmailAndPassword(auth,email,password);
      nav("/dashboard");
    } catch(e){
      alert(e.message);
    }
  }

  return (
    <div className="container" style={{maxWidth:420, marginTop:40}}>
      <h2>ASA Sports Betting</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div style={{display:"flex", gap:8, marginTop:10}}>
        <button onClick={login}>Sign in</button>
        <button onClick={register}>Create account</button>
      </div>
      <p style={{marginTop:10,fontSize:12}}>By using this site you confirm you are of legal betting age in your country.</p>
    </div>
  );
}
