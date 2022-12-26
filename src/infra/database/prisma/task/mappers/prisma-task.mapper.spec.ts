import { PrismaTaskMapper } from './prisma-task.mapper';
import { Task } from '@application/entities/task/task';

describe('Prisma Task mapper', () => {
  it('should be able to return a task mapper to Domain', () => {
    const task = PrismaTaskMapper.toDomain({
      id: '961c5772-c0a6-4eb5-90f0-093141ff789d',
      userId: 'dbe484fb-c8d7-464f-a05f-67417766f177',
      title: 'task.title',
      description: 'task.description',
      status: 'waiting',
      urlTask: 'task.urlTask',
      startedAt: new Date('2022-12-24T19:58:53.917Z'),
      dueDateAt: new Date('2022-12-24T19:58:53.917Z'),
      finishedAt: null,
      createdAt: new Date('2022-12-24T19:58:53.917Z'),
    });

    const raw = {
      _id: task.id,
      props: {
        userId: task.userId,
        title: task.title,
        description: task.description,
        status: task.status,
        urlTask: task.urlTask,
        startedAt: task.startedAt,
        dueDateAt: task.dueDateAt,
        finishedAt: task.finishedAt,
        createdAt: task.createdAt,
      },
    };

    expect(task).toEqual(raw);
  });

  it('should be able to return a task mapper to Prisma', () => {
    const raw = new Task({
      userId: 'dbe484fb-c8d7-464f-a05f-67417766f177',
      title: 'task.title',
      description: 'task.description',
      status: 'waiting',
      urlTask: 'task.urlTask',
      startedAt: new Date('2022-12-24T19:58:53.917Z'),
      dueDateAt: new Date('2022-12-24T19:58:53.917Z'),
      finishedAt: new Date('2022-12-24T19:58:53.917Z'),
      createdAt: new Date('2022-12-24T19:58:53.917Z'),
    });

    const task = {
      id: raw.id,
      userId: raw.userId,
      title: raw.title,
      description: raw.description,
      status: raw.status,
      urlTask: raw.urlTask,
      startedAt: raw.startedAt,
      dueDateAt: raw.dueDateAt,
      finishedAt: raw.finishedAt,
      createdAt: raw.createdAt,
    };

    expect(PrismaTaskMapper.toPrisma(raw)).toEqual(task);
  });
});
