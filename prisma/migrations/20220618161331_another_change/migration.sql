/*
  Warnings:

  - You are about to drop the column `users` on the `channels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "channels" DROP COLUMN "users";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "channelId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
