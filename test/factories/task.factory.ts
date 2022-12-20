import { Task, TaskProps } from '@application/entities/task/task';

type Override = Partial<TaskProps>;

export function makeTask(override: Override = {}) {
  return new Task({
    title: 'Task',
    userId: 'fake-user-id',
    ...override,
  });
}
