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

// WebSocket
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("join-document", (documentId) => {
    socket.join(documentId);
  });

  socket.on("document-update", (data) => {
    io.to(data.documentId).emit("document-update", data.content);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  })
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${process.env.PORT}`);
})

export { app, server };