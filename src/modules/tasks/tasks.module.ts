import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { TasksController } from 'src/controllers/tasks/tasks.controller';
import { TasksService } from 'src/services/tasks/tasks.service';

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
