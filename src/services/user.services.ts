import { prisma } from "../database/prisma.js";
import type { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";

export class UserService {
    public async list() {
        const users = await prisma.user.findMany()
        return users
    }

    public async getById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    public async create(dados: CreateUserDto) {
        const user = await prisma.user.create({
            data: dados
        })

        return user
    }

    public async update(id: string, dados: UpdateUserDto) {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: dados
        })

        return user
    }

    public async delete(id: string) {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })

        return user
    }
}