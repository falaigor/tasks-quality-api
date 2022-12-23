import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { TasksRepository } from '@application/repositories/tasks.repository';
import { AddTask } from '@application/use-cases/task/add-task';
import { GetUserTasks } from '@application/use-cases/task/get-user-tasks';
import { CountUserTasks } from '@application/use-cases/task/count-user-tasks';
import { FinishTask } from '@application/use-cases/task/finish-task';
import { UpdateStatusTask } from '@application/use-cases/task/update-status-task';
import { CreateTaskBody } from '../dtos/create-task-body';
import { Status } from '@application/entities/task/status';
import { TaskNotFound } from '@application/use-cases/task/errors/task-not-found.error';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksRepository: TasksRepository;

  const TasksRepositoryProvider = {
    provide: TasksRepository,
    useFactory: () => ({
      create: jest.fn(() => []),
      findById: jest.fn(() => []),
      findManyByUserId: jest.fn(() => []),
      countManyByUserId: jest.fn(() => []),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        PrismaService,
        TasksRepositoryProvider,
        AddTask,
        GetUserTasks,
        CountUserTasks,
        FinishTask,
        UpdateStatusTask,
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', async () => {
    expect(tasksController).toBeDefined();
  });

  describe('Create', () => {
    it('should be able not equal the null', async () => {
      const dto = new CreateTaskBody();

      expect(tasksController.create(dto)).not.toEqual(null);
    });

    it('should be able to create a new task', async () => {
      const dto = new CreateTaskBody();
      const { task } = await tasksController.create(dto);

      const returnTask = {
        _id: task.id,
        props: {
          userId: task.userId,
          title: task.title,
          description: task.description,
          urlTask: task.urlTask,
          status: task.status,
          startedAt: task.startedAt,
          dueDateAt: task.dueDateAt,
          finishedAt: task.finishedAt,
          createdAt: task.createdAt,
        },
      };

      expect(tasksRepository.create).toHaveBeenCalled();
      expect(tasksRepository.create).toBeCalledWith(returnTask);
    });
  });

  it('calling getFromUser method', async () => {
    tasksController.getFromUser('user-id');
    expect(tasksRepository.findManyByUserId).toHaveBeenCalled();
  });

  describe('CountFromUser', () => {
    it('calling method', async () => {
      tasksController.countFromUser('user-id');
      expect(tasksRepository.countManyByUserId).toHaveBeenCalled();
    });
  });

  describe('Finish', () => {
    it('calling finish method', async () => {
      tasksController.finish('task-id');
      expect(tasksRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error Task not found', async () => {
      tasksController.finish = () =>
        new Promise((resolve, reject) => {
          throw new TaskNotFound();
        });

      const result = tasksController.finish('task-id');

      await expect(result).rejects.toThrow('Task not found');
    });
  });

  describe('Status', () => {
    it('calling status method', async () => {
      const body = {
        status: Status.INPROGRESS,
      };
      tasksController.status('task-id', body);
      expect(tasksRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error Task not found', async () => {
      tasksController.status = () =>
        new Promise((resolve, reject) => {
          throw new TaskNotFound();
        });

      const body = {
        status: Status.INPROGRESS,
      };

      const result = tasksController.status('task-id', body);

      await expect(result).rejects.toThrow('Task not found');
    });
  });
});
