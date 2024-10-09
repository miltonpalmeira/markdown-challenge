import React, { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "@/app/context/AuthContext";
interface LoginProps {
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onLoginSuccess }) => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials. Please try again.");
      }

      const data = await response.json();
      const { user } = data;
      setUser(user);
      onLoginSuccess(user.username);
      onClose();
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
