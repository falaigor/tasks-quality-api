import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { TasksController } from './controllers/tasks.controller';
import { AddTask } from '@application/use-cases/task/add-task';
import { GetUserTasks } from '@application/use-cases/task/get-user-tasks';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [AddTask, GetUserTasks],
})
export class TaskModule {}
