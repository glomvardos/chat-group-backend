/*
  Warnings:

  - You are about to drop the column `userId` on the `channels` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "channels" DROP CONSTRAINT "channels_userId_fkey";

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "channelId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
