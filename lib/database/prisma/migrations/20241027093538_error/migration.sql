/*
  Warnings:

  - You are about to drop the column `pricePerDay` on the `BookedRoom` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerHour` on the `BookedRoom` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerMonth` on the `BookedRoom` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Room` table. All the data in the column will be lost.
  - Added the required column `price` to the `BookedRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerDay` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerMonth` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookedRoom" DROP COLUMN "pricePerDay",
DROP COLUMN "pricePerHour",
DROP COLUMN "pricePerMonth",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "price",
ADD COLUMN     "pricePerDay" INTEGER NOT NULL,
ADD COLUMN     "pricePerHour" INTEGER NOT NULL,
ADD COLUMN     "pricePerMonth" INTEGER NOT NULL;
