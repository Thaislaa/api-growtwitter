import type { Request, Response } from "express";
import { UserService } from "../services/user.services.js";
import { handleError } from "../utils/handle.error.js";
import { isValidId } from "../utils/is-valid-id.js";

export class UserController {
    private userService = new UserService()

    public async list(req: Request, res: Response) {
        try {
            const users = await this.userService.list()

            return res.status(200).send({
                ok: true,
                message: "Usuários listados com sucesso!",
                data: users
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

            const user = await this.userService.getById(id)

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            return res.status(200).send({
                ok: true,
                message: "Usuário listado com sucesso!",
                data: user
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { username, nome, senha, imagemUrl } = req.body;

            if (!username || !nome || !senha || !imagemUrl) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            const usuario = await this.userService.create({
                username,
                nome,
                senha,
                imagemUrl
            })

            return res.status(201).send({
                ok: true,
                message: "Usuário criado com sucesso!",
                data: usuario
            })
        } catch (error) {
            return handleError(error, res)
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!isValidId(id)) {
                return res.status(400).send({
                    ok: false,
                    message: "Id informado é inválido."
                })
            }

            const userExists = await this.userService.getById(id)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            const { username, nome, senha, imagemUrl } = req.body

            if (!username && !nome && !senha && !imagemUrl) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe pelo menos um campo."
                })
            }

            const user = await this.userService.update(id, {
                username,
                nome,
                senha,
                imagemUrl
            })

            return res.status(200).send({
                ok: true,
                message: "Usuário atualizado com sucesso!",
                data: user
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
                    message: "Id informado é inválido."
                })
            }

            const userExists = await this.userService.getById(id)
            if (!userExists) {
                return res.status(404).send({
                    ok: false,
                    message: "Id não encontrado."
                })
            }

            const user = await this.userService.delete(id)

            return res.status(200).send({
                ok: true,
                message: "Usuário deletado com sucesso!",
                data: user
            })
        } catch (error) {
            return handleError(error, res)
        }
    }
}
