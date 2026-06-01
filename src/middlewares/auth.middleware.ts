import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization

        console.log("AUTH:", authorization)

        if (!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token não informado."
            })
        }

        const token = authorization.split(" ")[1] as string

        console.log("TOKEN:", token)

        const decoded = jwt.verify(token, "senha") as jwt.JwtPayload

        console.log("DECODED:", decoded)

        req.userId = decoded.id

        next()
    } catch (error) {
        console.log("ERRO JWT:", error)

        return res.status(401).send({
            ok: false,
            message: "Token inválido."
        })
    }
}
