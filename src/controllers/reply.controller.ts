import type { Request, Response } from "express";
import { ReplyService } from "../services/reply.service.js";
import { handleError } from "../utils/handle.error.js";
import { isValidId } from "../utils/is-valid-id.js";
import { TweetService } from "../services/tweet.service.js";

export class ReplyController {
    private replyService = new ReplyService()
    private tweetService = new TweetService()

    public async list(req: Request, res: Response) {
        try {
            const replies = await this.replyService.list()

            return res.status(200).send({
                ok: true,
                message: "Replies listados com sucesso!",
                data: replies
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { tweetId, replyId } = req.params

            if (!tweetId || !replyId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os parâmetros."
                })
            }

            if (!isValidId(tweetId) || !isValidId(replyId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido."
                })
            }

            const reply = await this.replyService.getById(tweetId, replyId)

            if (!reply) {
                return res.status(404).send({
                    ok: false,
                    message: "Reply não encontrado."
                })
            }

            return res.status(200).send({
                ok: true,
                message: "Reply encontrado com sucesso!",
                data: reply
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { tweetId, replyId } = req.body
            const userId = req.userId

            if (!tweetId || !replyId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos"
                })
            }

            if (!isValidId(tweetId) || !isValidId(replyId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido."
                })
            }

            const tweetExists = await this.tweetService.getById(tweetId)
            const replyTweetExists = await this.tweetService.getById(replyId)

            if (!tweetExists || !replyTweetExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet ou reply não encontrado."
                })
            }

            if (replyTweetExists.usuarioId !== userId) {
                return res.status(403).send({
                    ok: false,
                    message: "Você não tem premissão para criar essa resposta."
                })
            }

            const reply = await this.replyService.create({ tweetId, replyId })
            return res.status(201).send({
                ok: true,
                message: "Reply criado com sucesso!",
                data: reply
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { tweetId, replyId } = req.params
            const userId = req.userId

            if (!tweetId || !replyId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os parâmetros."
                })
            }

            if (!isValidId(tweetId) || !isValidId(replyId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido"
                })
            }

            const replyExists = await this.replyService.getById(tweetId, replyId)
            if (!replyExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Reply não encontrado."
                })
            }

            if (replyExists.reply.usuarioId !== userId) {
                return res.status(403).send({
                    ok: false,
                    message: "Você não tem permissão para excluir esse reply."
                })
            }

            const reply = await this.replyService.delete(tweetId, replyId)
            await this.tweetService.delete(replyId)

            return res.status(200).send({
                ok: true,
                message: "Reply deletado com sucesso!",
                data: reply
            })
        } catch (error) {
            return handleError(error, res)
        }
    }
}