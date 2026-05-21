import { prisma } from "../database/prisma.js";
import type { CreateReplyDto } from "../dtos/reply.dto.js";

export class ReplyService {
    public async list() {
        const replies = await prisma.reply.findMany({
            include: {
                tweet: true,
                reply: true
            }
        })

        return replies
    }

    public async getById(tweetId: string, replyId: string) {
        const reply = await prisma.reply.findUnique({
            where: {
                tweetId_replyId: {
                    tweetId,
                    replyId
                }
            },
            include: {
                tweet: true,
                reply: true
            }
        })

        return reply
    }

    public async create(dados: CreateReplyDto) {
        const reply = await prisma.reply.create({
            data: dados
        })

        return reply
    }

    public async delete(tweetId: string, replyId: string) {
        const reply = await prisma.reply.delete({
            where: {
                tweetId_replyId: {
                    tweetId,
                    replyId
                }
            }
        })

        return reply
    }
}