import { Task } from '@application/entities/task/task';

export class TaskViewModel {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      userId: task.userId,
      title: task.title,
      description: task.description,
      urlTask: task.urlTask,
      status: task.status,
      startedAt: task.startedAt,
      dueDateAt: task.dueDateAt,
      finishedAt: task.finishedAt,
      createdAt: task.createdAt,
    };
  }
}
