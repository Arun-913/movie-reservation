/*
  Warnings:

  - Added the required column `slot` to the `LockedSeat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LockedSeat" ADD COLUMN     "slot" INTEGER NOT NULL;
