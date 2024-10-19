-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Confirm', 'Cancel', 'Success');

-- AlterTable
ALTER TABLE "BookedRoom" ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "totalBooking" INTEGER NOT NULL DEFAULT 0;
