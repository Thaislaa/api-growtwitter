import { Router } from "express";
import { FollowController } from "../controllers/follow.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const followRoutes = Router()
const followController = new FollowController()

followRoutes.get("/follow/followers/:userId", followController.listFollowersByUser.bind(followController))

followRoutes.get("/follow/following/:userId", followController.listFollowingByUser.bind(followController))

followRoutes.get("/follow/:followerId/:followingId", followController.getById.bind(followController))

followRoutes.post("/follow", authMiddleware, followController.create.bind(followController))

followRoutes.delete("/follow/:followingId", authMiddleware, followController.delete.bind(followController))

export { followRoutes }