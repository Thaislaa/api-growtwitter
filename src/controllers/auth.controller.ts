import type { Request, Response } from "express";
import { UserService } from "../services/user.services.js"
import { handleError } from "../utils/handle.error.js"
import jwt from "jsonwebtoken"

export class AuthController {
    private userService = new UserService();

    public async login(req: Request, res: Response) {
        try {
            const { username, senha } = req.body

            if (!username || !senha) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe todos os campos."
                })
            }

            const user = await this.userService.getByUsername(username)

            if (!user) {
                return res.status(401).send({
                    ok: false,
                    message: "Usuário não encontrado."
                })
            }

            if (user.senha !== senha) {
                return res.status(401).send({
                    ok: false,
                    message: "Senha incorreta."
                })
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username
                },
                "senha"
            )

            return res.status(200).send({
                ok: true,
                message: "Login realizado com sucesso!",
                data: {
                    token
                }
            })
        } catch (error) {
            return handleError(error, res)
        }
    }
}