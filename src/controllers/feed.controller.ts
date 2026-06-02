import type { Request, Response } from "express";
import { FeedService } from "../services/feed.service.js";
import { UserService } from "../services/user.services.js";
import { handleError } from "../utils/handle.error.js";

export class FeedController {
    private feedService = new FeedService()
    private userService = new UserService()

    public async list(req: Request, res: Response) {
        try {
            const userId = req.userId

            const userExists = await this.userService.getById(userId)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const feed = await this.feedService.list(userId)
            return res.status(200).send({
                ok: true,
                message: "Feed listado com sucesso!",
                data: feed
            })
        } catch (error) {
            return handleError(error, res)
        }
    }
}