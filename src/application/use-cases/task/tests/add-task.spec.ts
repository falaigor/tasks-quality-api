import { AddTask } from '../add-task';
import { InMemoryTasksRepository } from '@test/repositories/in-memory-tasks.repository';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const addTask = new AddTask(tasksRepository);

    const { task } = await addTask.execute({
      userId: 'fake-user-id',
      title: 'Task 1',
      description: 'Uma descrição da task',
      startedAt: new Date(),
      finishedAt: new Date(1671720896),
      urlTask: 'http://url-task.com',
    });

    expect(tasksRepository.tasks).toHaveLength(1);
    expect(tasksRepository.tasks[0]).toEqual(task);
  });
});
