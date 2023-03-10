import { TasksRepository } from '@application/repositories/tasks.repository';
import { TaskNotFound } from './errors/task-not-found.error';
import { Injectable } from '@nestjs/common';

interface FinishTaskRequest {
  taskId: string;
}

type FinishTaskResponse = void;

@Injectable()
export class FinishTask {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(request: FinishTaskRequest): Promise<FinishTaskResponse> {
    const { taskId } = request;

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFound();
    }

    task.finish();

    await this.tasksRepository.save(task);
  }
}
