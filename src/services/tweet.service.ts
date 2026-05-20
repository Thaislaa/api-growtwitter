import { prisma } from "../database/prisma.js";
import type { CreateTweetDto, UpdateTweetDto } from "../dtos/tweet.dto.js";

export class TweetService {
    public async list() {
        const tweets = await prisma.tweet.findMany()
        return tweets
    }

    public async getById(id: string) {
        const tweet = await prisma.tweet.findUnique({
            where: {
                id
            }
        })

        return tweet
    }

    public async create(dados: CreateTweetDto) {
        const tweet = await prisma.tweet.create({
            data: dados
        })

        return tweet
    }

    public async update(id: string, dados: UpdateTweetDto) {
        const tweet = await prisma.tweet.update({
            where: {
                id
            },
            data: dados
        })

        return tweet
    }

    public async delete(id: string) {
        const tweet = await prisma.tweet.delete({
            where: {
                id
            }
        })

        return tweet
    }
}