import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path : "./.env"
})

const app = express()

const appPort = process.env.PORT || 8000
app.listen(appPort, () => {

    console.log(`App server is running on port : ${appPort}`)
})

export { app };