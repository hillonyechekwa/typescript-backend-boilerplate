/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Authentication_sessionToken_key" ON "Authentication"("sessionToken");
