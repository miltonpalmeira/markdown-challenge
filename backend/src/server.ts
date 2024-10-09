import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import authRoutes  from './routes/authRoutes.js';
import documentRoutes  from './routes/documentRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/documents', documentRoutes);

const users: any = [];

// WebSocket
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("user_connected", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user_connected", username);
  });

  socket.on("document-update", (content) => {
    socket.broadcast.emit("document-update", content);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
    const username = users[socket.id];
    if (username) {
      console.log("User disconnected: ", username);
      socket.broadcast.emit("user_disconnected", username);
      delete users[socket.id];
    }
  })
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${process.env.PORT}`);
})