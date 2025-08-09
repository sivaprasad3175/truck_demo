import React, { useState } from "react";
import type { User } from "../types";

interface Props {
  onLogin: (email: string) => void;
  goRegister: () => void;
}

export default function Login({ onLogin, goRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      alert("Login successful");
      onLogin(email);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", background: "#fff", padding: 20, borderRadius: 8 }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogin}>Login</button>
      <p onClick={goRegister} style={{ color: "blue", cursor: "pointer" }}>No account? Register</p>
    </div>
  );
}
