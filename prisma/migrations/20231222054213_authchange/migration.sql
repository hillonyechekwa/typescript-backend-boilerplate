/*
  Warnings:

  - You are about to drop the column `password` on the `Authentication` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `Authentication` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Authentication_password_key";

-- AlterTable
ALTER TABLE "Authentication" DROP COLUMN "password",
DROP COLUMN "salt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT;
