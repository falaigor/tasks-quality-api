import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { TasksController } from './controllers/tasks.controller';
import { AddTask } from '@application/use-cases/task/add-task';
import { GetUserTasks } from '@application/use-cases/task/get-user-tasks';
import { CountUserTasks } from '@application/use-cases/task/count-user-tasks';
import { FinishTask } from '@application/use-cases/task/finish-task';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [AddTask, GetUserTasks, CountUserTasks, FinishTask],
})
export class TaskModule {}
