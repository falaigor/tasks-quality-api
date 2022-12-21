import { Task } from '@application/entities/task/task';
import { TasksRepository } from '@application/repositories/tasks.repository';

export class InMemoryTasksRepository implements TasksRepository {
  public tasks: Task[] = [];

  async findById(taskId: string): Promise<Task | null> {
    const task = this.tasks.find((item) => item.id === taskId);

    if (!task) {
      return null;
    }

    return task;
  }

  async findManyByUserId(userId: string): Promise<Task[]> {
    return this.tasks.filter((item) => item.userId === userId);
  }

  async create(task: Task) {
    this.tasks.push(task);
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex((item) => item.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
    }
  }
}
