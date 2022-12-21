import { CountUserTasks } from '../count-user-tasks';
import { makeTask } from '@test/factories/task.factory';
import { InMemoryTasksRepository } from '@test/repositories/in-memory-tasks.repository';

describe('Count user tasks', () => {
  it('should be able to count user tasks', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const countUserTasks = new CountUserTasks(tasksRepository);

    const task = makeTask({
      userId: 'user-id-one',
    });

    await tasksRepository.create(task);
    await tasksRepository.create(task);

    await tasksRepository.create(
      makeTask({
        userId: 'user-id-two',
      }),
    );

    const { count } = await countUserTasks.execute({
      userId: task.userId,
    });

    expect(count).toEqual(2);
  });
});
