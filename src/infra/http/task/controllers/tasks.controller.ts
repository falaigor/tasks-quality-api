import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskBody } from '../dtos/create-task-body';
import { TaskViewModel } from '../view-models/task.view-model';
import { AddTask } from '@application/use-cases/task/add-task';
import { GetUserTasks } from '@application/use-cases/task/get-user-tasks';

@Controller('tasks')
export class TasksController {
  constructor(private addTask: AddTask, private getUserTasks: GetUserTasks) {}

  @Get('from/:userId')
  async getFromUser(@Param('userId') userId: string) {
    const { tasks } = await this.getUserTasks.execute({
      userId,
    });

    return tasks.map(TaskViewModel.toHTTP);
  }

  @Post()
  async create(@Body() body: CreateTaskBody) {
    const { userId, title, description, urlTask, startedAt, dueDateAt } = body;
    const { task } = await this.addTask.execute({
      userId,
      title,
      description,
      urlTask,
      startedAt: new Date(startedAt),
      dueDateAt: new Date(dueDateAt),
    });

    return {
      task: TaskViewModel.toHTTP(task),
    };
  }
}
