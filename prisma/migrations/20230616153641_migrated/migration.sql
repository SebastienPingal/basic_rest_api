/*
  Warnings:

  - You are about to drop the column `wordcap` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wordcount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `wordcap`,
    DROP COLUMN `wordcount`,
    ADD COLUMN `word_cap` INTEGER NOT NULL DEFAULT 80000,
    ADD COLUMN `word_count` INTEGER NOT NULL DEFAULT 0;
