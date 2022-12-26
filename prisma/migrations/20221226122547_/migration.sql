/*
  Warnings:

  - Made the column `taskId` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "finishedAt" DATETIME,
    "canceledAt" DATETIME,
    "taskId" TEXT NOT NULL,
    CONSTRAINT "Issue_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Issue" ("canceledAt", "createdAt", "description", "finishedAt", "id", "taskId") SELECT "canceledAt", "createdAt", "description", "finishedAt", "id", "taskId" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
