-- CreateTable
CREATE TABLE "replies" (
    "tweet_id" TEXT NOT NULL,
    "reply_id" TEXT NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("tweet_id","reply_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "replies_reply_id_key" ON "replies"("reply_id");

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
