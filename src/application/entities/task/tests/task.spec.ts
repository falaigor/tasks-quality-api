import { Task } from '../task';

describe('Taks', () => {
  it('should be able to create a tasks', () => {
    const task = new Task({
      userId: 'fake-user-id',
      title: 'Uma nova task',
      description: 'Uma descrição bem legal',
      startedAt: new Date(),
      dueDateAt: new Date(1671720896),
      urlTask: 'http://url-link-task.com',
    });

    expect(task).toBeTruthy();
  });
});
