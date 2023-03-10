import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskBody } from '../dtos/create-task-body';
import { TaskViewModel } from '../view-models/task.view-model';
import { AddTask } from '@application/use-cases/task/add-task';
import { GetUserTasks } from '@application/use-cases/task/get-user-tasks';
import { CountUserTasks } from '@application/use-cases/task/count-user-tasks';
import { TaskNotFound } from '@application/use-cases/task/errors/task-not-found.error';
import { FinishTask } from '@application/use-cases/task/finish-task';
import { UpdateStatusTask } from '../../../../application/use-cases/task/update-status-task';
import { Status } from '@application/entities/task/status';
import { JwtAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    private addTask: AddTask,
    private getUserTasks: GetUserTasks,
    private countUserTasks: CountUserTasks,
    private finishTask: FinishTask,
    private updateStatusTask: UpdateStatusTask,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':taskId/status')
  async status(
    @Param('taskId') taskId: string,
    @Body() body: { status: Status },
  ) {
    try {
      const { status } = body;

      await this.updateStatusTask.execute({
        taskId,
        status,
      });
    } catch (err) {
      if (err instanceof TaskNotFound) {
        throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':taskId/finish')
  async finish(@Param('taskId') taskId: string) {
    try {
      await this.finishTask.execute({ taskId });
    } catch (err) {
      if (err instanceof TaskNotFound) {
        throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('count/from/:userId')
  async countFromUser(
    @Param('userId') userId: string,
  ): Promise<{ count: number }> {
    const count = await this.countUserTasks.execute({
      userId,
    });

    return count;
  }

  @UseGuards(JwtAuthGuard)
  @Get('from/:userId')
  async getFromUser(@Param('userId') userId: string) {
    const { tasks } = await this.getUserTasks.execute({
      userId,
    });

    return {
      tasks: tasks.map(TaskViewModel.toHTTP),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateTaskBody) {
    const { userId, title, description, urlTask, startedAt, dueDateAt } = body;
    const { task } = await this.addTask.execute({
      userId,
      title,
      description,
      urlTask,
      startedAt,
      dueDateAt,
    });

    return {
      task: TaskViewModel.toHTTP(task),
    };
  }
}
