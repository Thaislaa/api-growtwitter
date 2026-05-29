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

        const decoded = jwt.verify(token, "senha") as jwt.JwtPayload

        req.body.userId = decoded.id

        next()
    } catch (error) {
        return res.status(401).send({
            ok: false,
            message: "Token inválido."
        })
    }
}
