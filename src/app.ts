import express from "express";
import { userRoutes } from "./routes/user.routes.js";
import { tweetRoutes } from "./routes/tweet.routes.js";
import { replyRoutes } from "./routes/reply.routes.js";
import { likeRoutes } from "./routes/like.routes.js";
import { followRoutes } from "./routes/follow.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { feedRoutes } from "./routes/feed.routes.js";

const app = express();

app.use(express.json())

app.use(userRoutes)
app.use(tweetRoutes)
app.use(replyRoutes)
app.use(likeRoutes)
app.use(followRoutes)
app.use(authRoutes)
app.use(feedRoutes)

export { app }