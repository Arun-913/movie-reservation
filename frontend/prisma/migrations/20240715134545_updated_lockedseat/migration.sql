/*
  Warnings:

  - Added the required column `DateTime` to the `LockedSeat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LockedSeat" ADD COLUMN     "DateTime" TIMESTAMP(3) NOT NULL;
