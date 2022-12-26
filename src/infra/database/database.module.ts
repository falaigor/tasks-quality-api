import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { TasksRepository } from '@application/repositories/tasks.repository';
import { UsersRepository } from '@application/repositories/users.repository';
import { IssuesRepository } from '@application/repositories/issues.repository';

import { PrismaUserRepository } from './prisma/user/repositories/prisma-users.repository';
import { PrismaTaskRepository } from './prisma/task/repositories/prisma-tasks.repository';
import { PrismaIssueRepository } from './prisma/issue/repositories/prisma-issues.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TasksRepository,
      useClass: PrismaTaskRepository,
    },
    {
      provide: IssuesRepository,
      useClass: PrismaIssueRepository,
    },
  ],
  exports: [UsersRepository, TasksRepository, IssuesRepository],
})
export class DatabaseModule {}
