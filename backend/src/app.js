import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({
    path : "./.env"
})

const app = express()

app.use(express.json({ limit : "20kb" }))
app.use(cookieParser())
app.use(express.urlencoded({ extended : true, limit : "20kb" }))

const appPort = process.env.PORT || 8000
app.listen(appPort, () => {
    console.log(`App server is running on port : ${appPort}`)
})

//routes
import userRoutes from "./routes/user.routes.js";
<<<<<<< HEAD
import adminRoutes from "./routes/admin.routes.js";

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/admin", adminRoutes)
=======
import taskRoutes from "./routes/task.routes.js";

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/tasks", taskRoutes)
>>>>>>> 0a82fb6e8e9f7cd2b6bd6b1429853dfdd7484fe7

export { app };