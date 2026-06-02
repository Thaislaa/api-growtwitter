import { Router } from "express";
import { FeedController } from "../controllers/feed.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const feedRoutes = Router()
const feedController = new FeedController()

feedRoutes.get("/feed", authMiddleware, feedController.list.bind(feedController))

export { feedRoutes }