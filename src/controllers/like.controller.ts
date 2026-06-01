
import type { Request, Response } from "express";
import { LikeService } from "../services/like.service.js";
import { UserService } from "../services/user.services.js";
import { handleError } from "../utils/handle.error.js";
import { isValidId } from "../utils/is-valid-id.js";
import { TweetService } from "../services/tweet.service.js";

export class LikeController {
    private likeService = new LikeService()
    private userService = new UserService()
    private tweetService = new TweetService()

    public async listByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params

            if (!userId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe o id do usuário."
                })
            }

            if (!isValidId(userId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido."
                })
            }

            const userExists = await this.userService.getById(userId)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const userLikes = await this.likeService.listByUser(userId)
            return res.status(200).send({
                ok: true,
                message: "Tweets curtidos listados com sucesso!",
                data: userLikes
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { userId, tweetId } = req.params

            if (!userId || !tweetId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            if (!isValidId(userId) || !isValidId(tweetId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Um dos ids informado é inválido.",
                })
            }

            const userExists = await this.userService.getById(userId)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const tweetExists = await this.tweetService.getById(tweetId)
            if (!tweetExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado."
                })
            }

            const like = await this.likeService.getById(userId, tweetId)

            if (!like) {
                return res.status(404).send({
                    ok: false,
                    message: "Like não encontrado."
                })
            }

            return res.status(200).send({
                ok: true,
                message: "Tweet curtido encontrado com sucesso!",
                data: like
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { tweetId } = req.body
            const userId = req.userId

            if (!tweetId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            if (!isValidId(userId) || !isValidId(tweetId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Um dos ids informado é inválido.",
                })
            }

            const userExists = await this.userService.getById(userId)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const tweetExists = await this.tweetService.getById(tweetId)
            if (!tweetExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado."
                })
            }

            const likeExists = await this.likeService.getById(userId, tweetId)
            if (likeExists) {
                return res.status(400).send({
                    ok: false,
                    message: "Usuário já curtiu esse tweet."
                })
            }

            const like = await this.likeService.create({
                userId, tweetId
            })

            return res.status(201).send({
                ok: true,
                message: "Tweet curtido com sucesso!",
                data: like
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { tweetId } = req.params
            const userId = req.userId

            if (!userId || !tweetId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            if (!isValidId(userId) || !isValidId(tweetId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Um dos ids informado é inválido."
                })
            }

            const userExists = await this.userService.getById(userId)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const tweetExists = await this.tweetService.getById(tweetId)
            if (!tweetExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado."
                })
            }

            const likeExists = await this.likeService.getById(userId, tweetId)

            if (likeExists?.userId !== userId) {
                return res.status(403).send({
                    ok: false,
                    message: "Você não tem permissão para descurtir esse tweet."
                })
            }

            if (!likeExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Like não encontrado."
                })
            }

            const like = await this.likeService.delete(userId, tweetId)
            return res.status(200).send({
                ok: true,
                message: "Tweet descurtido com sucesso!",
                data: like
            })
        } catch (error) {
            return handleError(error, res)
        }
    }
}