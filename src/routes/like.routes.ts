import { Router } from "express";
import { LikeController } from "../controllers/like.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const likeRoutes = Router()
const likeController = new LikeController()

likeRoutes.get("/likes/:userId", likeController.listByUser.bind(likeController))

likeRoutes.get("/likes/:userId/:tweetId", likeController.getById.bind(likeController))

likeRoutes.post("/likes", authMiddleware, likeController.create.bind(likeController))

likeRoutes.delete("/likes/:userId/:tweetId", authMiddleware, likeController.delete.bind(likeController))

export { likeRoutes }