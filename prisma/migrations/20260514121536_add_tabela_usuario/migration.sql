-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "imagem_url" VARCHAR(255) NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");
