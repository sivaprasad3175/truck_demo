import type { User } from "../types";

interface Props {
  user: string; // We'll pass email to identify the logged-in user
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: Props) {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const currentUser = users.find((u) => u.email === user);
  console.log(currentUser)

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>User not found</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: 500,
        margin: "auto",
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Welcome, {currentUser.name} 👋</h1>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Age:</strong> {currentUser.age}</p>
      <p><strong>Gender:</strong> {currentUser.gender}</p>
      <p><strong>Address:</strong> {currentUser.address}</p>

      <button
        onClick={onLogout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 20px",
          marginTop: "20px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
