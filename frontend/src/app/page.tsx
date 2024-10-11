"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import Editor from "./components/Editor";
import Preview from "./components/Preview/Preview";
import UserList from "./components/UserList";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Login";
import jwt from "jsonwebtoken";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import Register from "./components/Login/Register";

const socket = io("http://localhost:4000");

export default function Home() {
  const [markDown, setMarkDown] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    socket.emit("user_connected", user);
  };

  const handleLogout = () => {
    if (username) {
      socket.emit("user_disconnected", username);
    }
    localStorage.removeItem("token");
    setUsername(null);
    setUsers([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwt.decode(token);
      if (decoded) {
        setUsername(decoded.userId);
        socket.emit("user_connected", decoded.userId);
      }
    }

    socket.on("user_connected", (user: string) => {
      setUsers((prevUsers) => {
        if (!prevUsers.includes(user)) {
          return [...prevUsers, user];
        }
        return prevUsers;
      });
    });

    socket.on("user_disconnected", (user: string) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
    });

    socket.on("document-update", (content: string) => {
      setMarkDown(content);
    });

    return () => {
      socket.off("user_connected");
      socket.off("user_disconnected");
      socket.off("document-update");
    };
  }, []);

  const handleChange = (value: string) => {
    setHistory((prevHistory) => [...prevHistory, markDown]);
    setRedoStack([]);
    setMarkDown(value);
    socket.emit("document-update", value);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastValue = history[history.length - 1];
      setRedoStack((prevRedo) => [markDown, ...prevRedo]);
      setMarkDown(lastValue);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      socket.emit('undo');
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastRedoValue = redoStack[0];
      setHistory((prevHistory) => [...prevHistory, markDown]);
      setMarkDown(lastRedoValue);
      setRedoStack((prevRedo) => prevRedo.slice(1));
      socket.emit('redo');
    }
  };

  return (
    <div className={styles.page}>
      <h1>Collaborative Markdown Editor</h1>
      {!username ? (
        <>
          <button
            onClick={() => setModalOpen(true)}
            className={styles.openModalButton}
          >
            Login
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <Login
              onClose={() => setModalOpen(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          </Modal>
          <button onClick={() => setRegisterModalOpen(true)} className={styles.openModalButton}>
            SignUp
          </button>
          <Modal
            isOpen={isRegisterModalOpen}
            onClose={() => setRegisterModalOpen(false)}
          >
            <Register
              onClose={() => setRegisterModalOpen(false)}
              onRegisterSuccess={(username) => {
                console.log("User registered:", username);
              }}
            />
          </Modal>
        </>
      ) : (
        <>
          <div>
            <LogoutButton onLogout={handleLogout} />
            <button onClick={handleUndo} className={styles.undoRedoButton} disabled={history.length === 0}>Undo</button>
            <button onClick={handleRedo} className={styles.undoRedoButton} disabled={redoStack.length === 0}>Redo</button>
          </div>
          <Editor markDown={markDown} onChange={handleChange} />
          <Preview content={markDown} />
          <UserList users={users} />
        </>
      )}
    </div>
  );
}
