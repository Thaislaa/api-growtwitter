-- CreateTable
CREATE TABLE "tweet" (
    "id" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
