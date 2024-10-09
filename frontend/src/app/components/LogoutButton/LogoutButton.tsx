import React from "react";
import styles from "./LogoutButton.module.css";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <button className={styles.logoutButton} onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
