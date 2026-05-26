import { Router } from "express";
import { FollowController } from "../controllers/follow.controller.js";

const followRoutes = Router()
const followController = new FollowController()

followRoutes.get("/follow/:followingId", followController.listFollowersByUser.bind(followController))

followRoutes.get("/follow/:followerId", followController.listFollowingByUser.bind(followController))

followRoutes.get("/follow/:followerId/:followingId", followController.getById.bind(followController))

followRoutes.post("/follow", followController.create.bind(followController))

followRoutes.delete("/follow/:followerId/:followingId", followController.delete.bind(followController))

export { followRoutes }