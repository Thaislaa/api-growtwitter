import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller.js";

const tweetRoutes = Router()

const tweetController = new TweetController()

tweetRoutes.get("/tweets", tweetController.list.bind(tweetController))

tweetRoutes.get("/tweets/:id", tweetController.getById.bind(tweetController))

tweetRoutes.post("/tweets", tweetController.create.bind(tweetController))

tweetRoutes.put("/tweets/:id", tweetController.update.bind(tweetController))

tweetRoutes.delete("/tweets/:id", tweetController.delete.bind(tweetController))

export { tweetRoutes }