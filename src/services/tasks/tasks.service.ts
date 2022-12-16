import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  create(data: Task) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: string) {
    return `This action returns a #${id} task`;
  }

  update(id: string, data: Task) {
    return `This action updates a #${id} task`;
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
