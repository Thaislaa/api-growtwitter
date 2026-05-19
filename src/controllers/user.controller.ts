import type { Request, Response } from "express";
import { UserService } from "../services/user.services.js";

export class UserController {
    public async list(req: Request, res: Response) {
        const userService = new UserService()

        const users = await userService.list();

        return res.status(200).send({
            ok: true,
            message: "Usuários listados com sucesso!",
            data: users
        })
    }

    public async getById(req: Request, res: Response) {
        const userService = new UserService()

        const { id } = req.params

        if (typeof id != "string") {
            return res.status(400).send({
                ok: false,
                message: "Id informado é inválido."
            })
        }

        const user = await userService.getById(id)

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
    }

    public async create(req: Request, res: Response) {
        const userService = new UserService()

        const { username, nome, senha, imagemUrl } = req.body;

        const usuario = await userService.create({
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
    }

    public async update(req: Request, res: Response) {
        const userService = new UserService()

        const { id } = req.params

        if (typeof id != "string") {
            return res.status(400).send({
                ok: false,
                message: "Id informado é inválido."
            })
        }

        const { username, nome, senha, imagemUrl } = req.body

        const user = await userService.update(id, {
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
    }

    public async delete(req: Request, res: Response) {
        const userService = new UserService()

        const { id } = req.params

        if (typeof id !== "string") {
            return res.status(400).send({
                ok: false,
                message: "Id informado é inválido."
            })
        }

        const user = await userService.delete(id)

        return res.status(200).send({
            ok: true,
            message: "Usuário deletado com sucesso!",
            data: user
        })
    }
}

