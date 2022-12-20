import { Task } from '@application/entities/task/task';
import { TasksRepository } from '@application/repositories/tasks.repository';

export class InMemoryTasksRepository implements TasksRepository {
  public tasks: Task[] = [];

  async create(task: Task) {
    this.tasks.push(task);
  }
}
