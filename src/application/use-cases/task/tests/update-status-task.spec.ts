import { makeTask } from '@test/factories/task.factory';
import { UpdateStatusTask } from '../update-status-task';
import { Status } from '@application/entities/task/status';
import { TaskNotFound } from '../errors/task-not-found.error';
import { InMemoryTasksRepository } from '@test/repositories/in-memory-tasks.repository';

describe('Update task status', () => {
  it('should be able to update a task status for IN PROGRESS', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const updateStatusTask = new UpdateStatusTask(tasksRepository);

    const task = makeTask();

    await tasksRepository.create(task);

    await updateStatusTask.execute({
      taskId: task.id,
      status: Status.INPROGRESS,
    });

    expect(tasksRepository.tasks[0].status).toEqual(Status.INPROGRESS);
  });

  it('should be able to update a task status for COMPLETED', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const updateStatusTask = new UpdateStatusTask(tasksRepository);

    const task = makeTask();

    await tasksRepository.create(task);

    await updateStatusTask.execute({
      taskId: task.id,
      status: Status.COMPLETED,
    });

    expect(tasksRepository.tasks[0].status).toEqual(Status.COMPLETED);
  });

  it('should be able to update a task status for CANCELED', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const updateStatusTask = new UpdateStatusTask(tasksRepository);

    const task = makeTask();

    await tasksRepository.create(task);

    await updateStatusTask.execute({
      taskId: task.id,
      status: Status.CANCELED,
    });

    expect(tasksRepository.tasks[0].status).toEqual(Status.CANCELED);
  });

  it('should not be able to finish a non existing task', async () => {
    const tasksRepository = new InMemoryTasksRepository();
    const updateStatusTask = new UpdateStatusTask(tasksRepository);

    expect(
      updateStatusTask.execute({
        taskId: 'fake-task-id',
        status: Status.INPROGRESS,
      }),
    ).rejects.toThrow(TaskNotFound);
  });
});
