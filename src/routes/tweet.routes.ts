import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const tweetRoutes = Router()

const tweetController = new TweetController()

tweetRoutes.get("/tweets", tweetController.list.bind(tweetController))

tweetRoutes.get("/tweets/:id", tweetController.getById.bind(tweetController))

tweetRoutes.post("/tweets", authMiddleware, tweetController.create.bind(tweetController))

tweetRoutes.put("/tweets/:id", authMiddleware, tweetController.update.bind(tweetController))

tweetRoutes.delete("/tweets/:id", authMiddleware, tweetController.delete.bind(tweetController))

export { tweetRoutes }