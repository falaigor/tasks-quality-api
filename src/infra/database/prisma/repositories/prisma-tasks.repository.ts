import { PrismaService } from '../prisma.service';
import { Task } from '@application/entities/task/task';
import { PrismaTaskMapper } from '../mappers/prisma-task.mapper';
import { TasksRepository } from '@application/repositories/tasks.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTaskRepository implements TasksRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(taskId: string): Promise<Task | null> {
    const task = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return null;
    }

    return PrismaTaskMapper.toDomain(task);
  }

  async findManyByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany({
      where: {
        userId,
      },
    });

    return tasks.map(PrismaTaskMapper.toDomain);
  }

  async countManyByUserId(userId: string): Promise<number> {
    const count = await this.prismaService.task.count({
      where: {
        userId,
      },
    });

    return count;
  }

  async create(task: Task): Promise<void> {
    const raw = PrismaTaskMapper.toPrisma(task);

    await this.prismaService.task.create({
      data: raw,
    });
  }

  async save(task: Task): Promise<void> {
    const raw = PrismaTaskMapper.toPrisma(task);

    await this.prismaService.task.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
