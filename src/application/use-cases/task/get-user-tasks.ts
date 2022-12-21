import { Task } from '@application/entities/task/task';
import { TasksRepository } from '@application/repositories/tasks.repository';
import { Injectable } from '@nestjs/common';

interface GetUserTasksRequest {
  userId: string;
}

interface GetUserTasksResponse {
  tasks: Task[];
}

@Injectable()
export class GetUserTasks {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(request: GetUserTasksRequest): Promise<GetUserTasksResponse> {
    const { userId } = request;

    const tasks = await this.tasksRepository.findManyByUserId(userId);

    return { tasks };
  }
}
