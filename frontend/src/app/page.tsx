"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import Editor from "./components/Editor";
import Preview from "./components/Preview/Preview";
import UserList from "./components/UserList";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Login";

const socket = io("http://localhost:4000");

export default function Home() {
  const [markDown, setMarkDown] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    socket.emit("user_connected", user);
  };

  useEffect(() => {
    socket.on("user_connected", (user: string) => {
      setUsers((prevUsers) => [...prevUsers, user]);
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
    setMarkDown(value);
    socket.emit("document-update", value);
  };

  return (
    <div className={styles.page}>
      <h1>Collaborative Markdown Editor</h1>
      {!username ? (
        <>
          <button onClick={() => setModalOpen(true)} className={styles.openModalButton}>Login</button>
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <Login onClose={() => setModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
          </Modal>
        </>
      ) : (
        <>
          <Editor markDown={markDown} onChange={handleChange} />
          <Preview content={markDown} />
          <UserList users={users} />
        </>
      )}
    </div>
  );
}
