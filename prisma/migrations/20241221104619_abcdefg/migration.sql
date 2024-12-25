/*
  Warnings:

  - A unique constraint covering the columns `[UID]` on the table `Workspaces` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspaces_UID_key" ON "Workspaces"("UID");

-- RenameForeignKey
ALTER TABLE "Workspaces" RENAME CONSTRAINT "uid_FK" TO "Workspaces_UID_fkey";
