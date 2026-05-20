import type { Request, Response } from "express";
import { TweetService } from "../services/tweet.service.js";
import { handleError } from "../utils/handle.error.js";
import { isValidId } from "../utils/is-valid-id.js";
import { UserService } from "../services/user.services.js";

export class TweetController {
    private tweetService = new TweetService()

    public async list(req: Request, res: Response) {
        try {
            const tweets = await this.tweetService.list()

            return res.status(200).send({
                ok: true,
                message: "Tweets listados com sucesso!",
                data: tweets
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!isValidId(id)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido."
                })
            }

            const tweet = await this.tweetService.getById(id)

            if (!tweet) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado."
                })
            }

            return res.status(200).send({
                ok: true,
                message: "Tweet encontrado com sucesso!",
                data: tweet
            })

        } catch (error) {
            return handleError(error, res)
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { usuarioId, conteudo } = req.body

            if (!usuarioId || !conteudo) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            const userService = new UserService();
            const userExists = await userService.getById(usuarioId)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const tweet = await this.tweetService.create({
                usuarioId, conteudo
            })

            return res.status(201).send({
                ok: true,
                message: "Tweet criado com sucesso!",
                data: tweet
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { conteudo } = req.body

            if (!isValidId(id)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido"
                })
            }

            const tweetExists = await this.tweetService.getById(id)
            if (!tweetExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado."
                })
            }

            if (!conteudo) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe o campo a ser atualizado."
                })
            }

            const tweet = await this.tweetService.update(id, {
                conteudo
            })

            return res.status(200).send({
                ok: true,
                message: "Tweet atualizado com sucesso!",
                data: tweet
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!isValidId(id)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido"
                })
            }

            const tweetExists = await this.tweetService.getById(id)
            if (!tweetExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado."
                })
            }

            const tweet = await this.tweetService.delete(id)

            return res.status(200).send({
                ok: true,
                message: "Tweet deletado com sucesso!",
                data: tweet
            })
        } catch (error) {
            return handleError(error, res)
        }
    }
}