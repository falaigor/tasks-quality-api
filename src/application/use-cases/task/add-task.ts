import { Task } from '@application/entities/task/task';
import { TasksRepository } from '@application/repositories/tasks.repository';

interface AddTaskRequest {
  userId: string;
  title: string;
  description?: string;
  startedAt?: Date | null;
  finishedAt?: Date | null;
  urlTask?: string;
}

interface AddTaskResponse {
  task: Task;
}

export class AddTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(request: AddTaskRequest): Promise<AddTaskResponse> {
    const { userId, title, description, startedAt, finishedAt, urlTask } =
      request;

    const task = new Task({
      userId,
      title,
      description,
      startedAt,
      finishedAt,
      urlTask,
    });

    await this.tasksRepository.create(task);

    return { task };
  }
}
