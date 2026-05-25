import { prisma } from "../database/prisma.js";
import type { CreateFollowDto } from "../dtos/follow.dto.js";

export class FollowService {
    public async listFollowersByUser(followingId: string) {
        const following = await prisma.follow.findMany({
            where: {
                followingId
            },
            include: {
                follower: true
            }
        })

        return following
    }

    public async listFollowingByUser(followerId: string) {
        const follower = await prisma.follow.findMany({
            where: {
                followerId
            },
            include: {
                following: true
            }
        })

        return follower
    }

    public async getById(followerId: string, followingId: string) {
        const follow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        })

        return follow
    }

    public async create(dados: CreateFollowDto) {
        const follow = await prisma.follow.create({
            data: dados
        })

        return follow
    }

    public async delete(followerId: string, followingId: string) {
        const follow = await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        })

        return follow
    }
}