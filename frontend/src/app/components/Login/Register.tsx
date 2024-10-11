import React, { useState } from "react";
import styles from "./Register.module.css";

interface RegisterProps {
  onClose: () => void;
  onRegisterSuccess: (username: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onClose, onRegisterSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || username === "" || password === "") {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed.");
      }

      const data = await response.json();
      onRegisterSuccess(data.user.username);
      onClose();
    } catch (error: any) {
      setError("Error creating user: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2>Register</h2>
      {error && <p className={styles.error}>{error}</p>}

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.registerButton}>
          Register
        </button>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Register;
