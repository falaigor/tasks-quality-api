import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { TasksRepository } from '@application/repositories/tasks.repository';
import { PrismaTaskRepository } from '@infra/database/prisma/repositories/prisma-tasks.repository';
import { AddTask } from '@application/use-cases/task/add-task';
import { GetUserTasks } from '@application/use-cases/task/get-user-tasks';
import { CountUserTasks } from '@application/use-cases/task/count-user-tasks';
import { FinishTask } from '@application/use-cases/task/finish-task';
import { UpdateStatusTask } from '@application/use-cases/task/update-status-task';

describe('TasksController', () => {
  let tasksController: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        PrismaService,
        {
          provide: TasksRepository,
          useClass: PrismaTaskRepository,
        },
        AddTask,
        GetUserTasks,
        CountUserTasks,
        FinishTask,
        UpdateStatusTask,
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
  });

  it('should be defined', async () => {
    expect(tasksController).toBeDefined();
  });
});
