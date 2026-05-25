import express from "express";
import { userRoutes } from "./routes/user.routes.js";
import { tweetRoutes } from "./routes/tweet.routes.js";
import { replyRoutes } from "./routes/reply.routes.js";
import { likeRoutes } from "./routes/like.routes.js";

const app = express();

app.use(express.json())

app.use(userRoutes)
app.use(tweetRoutes)
app.use(replyRoutes)
app.use(likeRoutes)

export { app }