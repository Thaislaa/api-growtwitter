export interface CreateUserDto {
    username: string
    nome: string
    senha: string
    imagemUrl: string
}

export interface UpdateUserDto {
    username?: string
    nome?: string
    senha?: string
    imagemUrl?: string
}