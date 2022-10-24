/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Referrals` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Referrals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Referrals" DROP CONSTRAINT "Referrals_createdBy_fkey";

-- AlterTable
ALTER TABLE "Referrals" DROP COLUMN "createdBy",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
