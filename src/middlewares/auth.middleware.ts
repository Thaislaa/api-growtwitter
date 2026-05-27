import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token não informado."
            })
        }

        const token = authorization.split(" ")[1] as string

        jwt.verify(token, "senha")

        next()
    } catch (error) {
        return res.status(401).send({
            ok: false,
            message: "Token inválido."
        })
    }
}
