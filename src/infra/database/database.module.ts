import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { TasksRepository } from '@application/repositories/tasks.repository';
import { UsersRepository } from '@application/repositories/users.repository';

import { PrismaUserRepository } from './prisma/user/repositories/prisma-users.repository';
import { PrismaTaskRepository } from './prisma/task/repositories/prisma-tasks.repository';

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
  ],
  exports: [UsersRepository, TasksRepository],
})
export class DatabaseModule {}
