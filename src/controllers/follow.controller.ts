
import type { Request, Response } from "express";
import { isValidId } from "../utils/is-valid-id.js";
import { UserService } from "../services/user.services.js";
import { FollowService } from "../services/follow.service.js";
import { handleError } from "../utils/handle.error.js";

export class FollowController {
    private userService = new UserService()
    private followService = new FollowService()

    public async listFollowersByUser(req: Request, res: Response) {
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

            const user = await this.userService.getById(userId)

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const usersFollowers = await this.followService.listFollowersByUser(userId)

            return res.status(200).send({
                ok: true,
                message: "Seguidores do usuário listados com sucesso!",
                data: usersFollowers
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async listFollowingByUser(req: Request, res: Response) {
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

            const user = await this.userService.getById(userId)

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const usersFollowing = await this.followService.listFollowingByUser(userId)

            return res.status(200).send({
                ok: true,
                message: "Usuários seguidos listados com sucesso!",
                data: usersFollowing
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { followerId, followingId } = req.params

            if (!followerId || !followingId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            if (!isValidId(followerId) || !isValidId(followingId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Um dos ids informados é inválido."
                })
            }

            const follow = await this.followService.getById(followerId, followingId)

            if (!follow) {
                return res.status(404).send({
                    ok: false,
                    message: "Follow não existe."
                })
            }

            return res.status(200).send({
                ok: true,
                message: "Follow listado com sucesso!",
                data: follow
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { userId, followingId } = req.body

            if (!userId || !followingId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            if (!isValidId(userId) || !isValidId(followingId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Um dos ids informado é inválido."
                })
            }

            const followerExists = await this.userService.getById(userId)
            if (!followerExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Follower não encontrado."
                })
            }

            const followingExists = await this.userService.getById(followingId)
            if (!followingExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Following não encontrado."
                })
            }

            const exists = await this.followService.getById(userId, followingId)
            if (exists) {
                return res.status(400).send({
                    ok: false,
                    message: "Follow já existe."
                })
            }

            if (userId === followingId) {
                return res.status(400).send({
                    ok: false,
                    message: "Usuário não pode seguir a si mesmo."
                })
            }

            const follow = await this.followService.create({ followerId: userId, followingId })
            return res.status(201).send({
                ok: true,
                message: "Follow realizado com sucesso!",
                data: follow
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { followerId, followingId } = req.params

            if (!followerId || !followingId) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            if (!isValidId(followerId) || !isValidId(followingId)) {
                return res.status(400).send({
                    ok: false,
                    message: "Um dos ids informados é inválido."
                })
            }

            const followExists = await this.followService.getById(followerId, followingId)
            if (!followExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Follow não encontrado."
                })
            }

            const deletedFollow = await this.followService.delete(followerId, followingId)

            return res.status(200).send({
                ok: true,
                message: "Unfollow realizado com sucesso!",
                data: deletedFollow
            })
        } catch (error) {
            return handleError(error, res)
        }
    }
}