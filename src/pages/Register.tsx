import React, { useState } from "react";
import type { User } from "../types";

interface Props {
  goLogin: () => void;
}

export default function Register({ goLogin }: Props) {
  const [form, setForm] = useState<User & { confirmPassword?: string; age?: string; gender?: string }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    address:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.age || !form.gender) {
      alert("Please fill all fields");
      return;
    }

    // Age validation
    if (Number(form.age) < 18) {
      alert("You must be at least 18 years old to register");
      return;
    }

    // Password match check
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u: User) => u.email === form.email);

    if (exists) {
      alert("Email already registered");
      return;
    }

    // Store without confirmPassword
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = form;
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful");
    goLogin();
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} style={inputStyle} />
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} style={inputStyle} />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} value={form.age} style={inputStyle} />
      <select name="gender" onChange={handleChange} value={form.gender} style={inputStyle}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input name="address" type="value" placeholder="Address" onChange={handleChange} value={form.address} style={inputStyle} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} style={inputStyle} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} value={form.confirmPassword} style={inputStyle} />
      <button onClick={handleRegister} style={buttonStyle}>Register</button>
      <p onClick={goLogin} style={{ color: "blue", cursor: "pointer", marginTop: 10 }}>Already have an account? Login</p>
    </div>
  );
}

// Inline styles for consistency
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4285F4",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
