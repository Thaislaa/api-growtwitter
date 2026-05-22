import { prisma } from "../database/prisma.js";
import type { CreateLikeDto } from "../dtos/like.dto.js";

export class LikeService {
    public async listByUser(userId: string) {
        const likes = await prisma.like.findMany({
            where: {
                userId
            }
        })

        return likes
    }

    public async getById(userId: string, tweetId: string) {
        const like = await prisma.like.findUnique({
            where: {
                userId_tweetId: {
                    userId,
                    tweetId
                }
            }
        })

        return like
    }

    public async create(dados: CreateLikeDto) {
        const like = await prisma.like.create({
            data: dados
        })

        return like
    }

    public async delete(userId: string, tweetId: string) {
        const like = await prisma.like.delete({
            where: {
                userId_tweetId: {
                    userId,
                    tweetId
                }
            }
        })

        return like
    }
}