import type { Response } from "express";

export function handleError(error: any, res: Response) {
    res.status(500).send({
        ok: false,
        message: error.toString()
    })
}