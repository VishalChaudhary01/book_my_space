/*
  Warnings:

  - The values [Pending,Confirm,Cancel,Success] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "OauthProvider" AS ENUM ('GOOGLE');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL_VERIFICATION', 'RESET_PASSWORD');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('BOOKED', 'CANCEL', 'SUCCESS');
ALTER TABLE "BookedRoom" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BookedRoom" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "BookedRoom" ALTER COLUMN "status" SET DEFAULT 'BOOKED';
COMMIT;

-- AlterTable
ALTER TABLE "BookedRoom" ALTER COLUMN "status" SET DEFAULT 'BOOKED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oauthId" TEXT,
ADD COLUMN     "oauthProvider" "OauthProvider",
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "VerificatinToke" (
    "token" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificatinToke_token_id_key" ON "VerificatinToke"("token", "id");
