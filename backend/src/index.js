import { app } from "./app.js";
import { db_connect } from "./db/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import socketController from "./controllers/socket.controller.js";

db_connect();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

socketController(io);

const appPort = process.env.PORT || 7240;
server.listen(appPort, () => {
  console.log(`Server is running with sockets on http://localhost:${appPort}`);
});
