import { Task } from '@application/entities/task/task';

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
  abstract save(task: Task): Promise<void>;
  abstract findById(taskId: string): Promise<Task | null>;
  abstract findManyByUserId(userId: string): Promise<Task[]>;
  abstract countManyByUserId(userId: string): Promise<number>;
}
