import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({
    path : "./.env"
})

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended : true }))


//routes
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/task", taskRoutes)

export { app };