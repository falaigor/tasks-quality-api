import { Task } from '@application/entities/task/task';

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
  abstract save(task: Task): Promise<void>;
  abstract findById(taskId: string): Promise<Task | null>;
}
