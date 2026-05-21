import express from "express";
import { userRoutes } from "./routes/user.routes.js";
import { tweetRoutes } from "./routes/tweet.routes.js";

const app = express();

app.use(express.json())

app.use(userRoutes)
app.use(tweetRoutes)

export { app }