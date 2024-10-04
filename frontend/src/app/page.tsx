"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { marked } from "marked";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Home() {
  const [markDown, setMarkDown] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("update", (data: string) => {
      setMarkDown(data);
    });
    
    socket.on("users", (users: string[]) => {
      setUsers(users);
    });

    return () => {
      socket.off('update');
      socket.off('users');
    }
  });

  const handleEventChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkDown(value);
    // Send the new value to the server
    socket.emit('edit', value);
  }

  return (
    <div className={styles.page}>
      <h1>Type anything: </h1>
      <textarea value={markDown} onChange={handleEventChange} style={{ width: '900px', height: '200px' }} />
      <div dangerouslySetInnerHTML={{ __html: marked(markDown)}} />

      <div>
        <h2>Users: </h2>
        {users.map(user => <div key={user}>{user}</div>)}
      </div>
    </div>
  )
}
