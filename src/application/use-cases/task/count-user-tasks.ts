import { TasksRepository } from '@application/repositories/tasks.repository';

interface CountUserTasksRequest {
  userId: string;
}

interface CountUserTasksResponse {
  count: number;
}

export class CountUserTasks {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(
    request: CountUserTasksRequest,
  ): Promise<CountUserTasksResponse> {
    const { userId } = request;

    const count = await this.tasksRepository.countManyByUserId(userId);

    return { count };
  }
}
