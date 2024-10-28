/*
  Warnings:

  - You are about to drop the `VerificatinToke` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VerificatinToke";

-- CreateTable
CREATE TABLE "VerificationToken" (
    "token" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_id_key" ON "VerificationToken"("token", "id");
