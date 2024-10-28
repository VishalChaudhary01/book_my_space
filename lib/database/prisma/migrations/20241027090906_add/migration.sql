/*
  Warnings:

  - You are about to drop the column `price` on the `BookedRoom` table. All the data in the column will be lost.
  - Added the required column `pricePerDay` to the `BookedRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `BookedRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerMonth` to the `BookedRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookedRoom" DROP COLUMN "price",
ADD COLUMN     "pricePerDay" INTEGER NOT NULL,
ADD COLUMN     "pricePerHour" INTEGER NOT NULL,
ADD COLUMN     "pricePerMonth" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bill" INTEGER NOT NULL DEFAULT 0;
