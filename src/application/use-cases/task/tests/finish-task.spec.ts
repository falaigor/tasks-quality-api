import { FinishTask } from '../finish-task';
import { makeTask } from '@test/factories/task.factory';
import { InMemoryTasksRepository } from '@test/repositories/in-memory-tasks.repository';
import { TaskNotFound } from '../errors/task-not-found.error';

describe('Finish task', () => {
  it('should be able to finish a task', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const finishTask = new FinishTask(tasksRepository);

    const task = makeTask();

    await tasksRepository.create(task);

    await finishTask.execute({
      taskId: task.id,
    });

    expect(tasksRepository.tasks[0].finishedAt).toEqual(task.finishedAt);
  });

  it('should not be able to finish a non existing task', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const finishTask = new FinishTask(tasksRepository);

    expect(
      finishTask.execute({
        taskId: 'fake-task-id',
      }),
    ).rejects.toThrow(TaskNotFound);
  });
});
