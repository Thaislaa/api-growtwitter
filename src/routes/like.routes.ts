import { Router } from "express";
import { LikeController } from "../controllers/like.controller.js";

const likeRoutes = Router()
const likeController = new LikeController()

likeRoutes.get("/likes/:userId", likeController.listByUser.bind(likeController))

likeRoutes.get("/likes/:userId/:tweetId", likeController.getById.bind(likeController))

likeRoutes.post("/likes", likeController.create.bind(likeController))

likeRoutes.delete("/likes/:userId/:tweetId", likeController.delete.bind(likeController))

export { likeRoutes }