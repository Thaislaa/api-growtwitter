import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/users", userController.list.bind(userController));

userRoutes.get("/users/:id", userController.getById.bind(userController))

userRoutes.post("/users", userController.create.bind(userController));

userRoutes.put("/users/:id", userController.update.bind(userController))

userRoutes.delete("/users/:id", userController.delete.bind(userController))

export { userRoutes }