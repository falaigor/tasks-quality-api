import { Task } from '@application/entities/task/task';

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
}
