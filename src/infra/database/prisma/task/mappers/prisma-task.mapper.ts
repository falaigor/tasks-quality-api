import { Task as RawTask } from '@prisma/client';
import { Task } from '@application/entities/task/task';

export class PrismaTaskMapper {
  static toPrisma(task: Task) {
    return {
      id: task.id,
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
      urlTask: task.urlTask,
      startedAt: task.startedAt,
      dueDateAt: task.dueDateAt,
      finishedAt: task.finishedAt,
      createdAt: task.createdAt,
    };
  }

  static toDomain(raw: RawTask) {
    return new Task(
      {
        userId: raw.userId,
        title: raw.title,
        description: raw.description,
        status: raw.status,
        urlTask: raw.urlTask,
        startedAt: raw.startedAt,
        dueDateAt: raw.dueDateAt,
        finishedAt: raw.finishedAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
