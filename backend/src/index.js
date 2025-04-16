import { app } from "./app.js";
import { db_connect } from "./db/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import socketController from "./controllers/socket.controller.js";


const appPort = process.env.PORT || 8000
app.listen(appPort, () => {
    console.log(`App server is running on port : ${appPort}`)
})

//database connection of application
db_connect();

const server = createServer(app)

const io = new Server(server, {
    cors: true,
});

socketController(io);
  