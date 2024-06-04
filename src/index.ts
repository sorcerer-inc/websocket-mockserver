import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const port = 3001;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  io.emit("chat message", `User ${socket.id} connected`);
  socket.emit("chat message", "Hello from server");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("hello", (msg) => {
    console.log("message: " + msg);
    socket.emit("hello", "Hello from server");
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
