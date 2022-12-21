import { TasksRepository } from '@application/repositories/tasks.repository';
import { TaskNotFound } from './errors/task-not-found.error';
import { Status } from '@application/entities/task/status';

interface UpdateStatusTaskRequest {
  taskId: string;
  status: Status;
}

type UpdateStatusTaskResponse = void;

export class UpdateStatusTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(
    request: UpdateStatusTaskRequest,
  ): Promise<UpdateStatusTaskResponse> {
    const { taskId, status } = request;

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFound();
    }

    task.status = status;

    await this.tasksRepository.save(task);
  }
}
