/*
  Warnings:

  - You are about to drop the column `DateTime` on the `LockedSeat` table. All the data in the column will be lost.
  - Added the required column `deleteAt` to the `LockedSeat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LockedSeat" DROP COLUMN "DateTime",
ADD COLUMN     "deleteAt" TIMESTAMP(3) NOT NULL;
