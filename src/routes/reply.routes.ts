import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const replyRoutes = Router()
const replyController = new ReplyController()

replyRoutes.get("/replies", replyController.list.bind(replyController))

replyRoutes.get("/replies/:tweetId/:replyId", replyController.getById.bind(replyController))

replyRoutes.post("/replies", authMiddleware, replyController.create.bind(replyController))

replyRoutes.delete("/replies/:tweetId/:replyId", authMiddleware, replyController.delete.bind(replyController))

export { replyRoutes }