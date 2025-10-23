/*
  Warnings:

  - Added the required column `metadata` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cancel` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "metadata" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "cancel" TEXT NOT NULL;
