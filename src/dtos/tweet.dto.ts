export interface CreateTweetDto {
    conteudo: string
    usuarioId: string
}

export interface UpdateTweetDto {
    conteudo?: string
}