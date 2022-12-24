-- CreateTable
CREATE TABLE "Issues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "finishedAt" DATETIME,
    "canceledAt" DATETIME,
    "taskId" TEXT,
    CONSTRAINT "Issues_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
