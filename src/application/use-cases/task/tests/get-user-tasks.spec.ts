import { GetUserTasks } from '../get-user-tasks';
import { makeTask } from '@test/factories/task.factory';
import { InMemoryTasksRepository } from '@test/repositories/in-memory-tasks.repository';

describe('Get user tasks', () => {
  it('should be able to get user tasks', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const getUserTasks = new GetUserTasks(tasksRepository);

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

    const { tasks } = await getUserTasks.execute({
      userId: task.userId,
    });

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-id-one' }),
        expect.objectContaining({ userId: 'user-id-one' }),
      ]),
    );
  });
});
