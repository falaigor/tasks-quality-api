import { Task } from '../task';

describe('Task', () => {
  it('should be able to create a tasks', () => {
    const task = new Task({
      userId: 'fake-user-id',
      title: 'Uma nova task',
      description: 'Uma descrição bem legal',
      startedAt: new Date('2022-12-21T14:16:43.051Z'),
      dueDateAt: new Date('2022-12-23T14:16:43.051Z'),
      urlTask: 'http://url-link-task.com',
    });

    expect(task).toBeTruthy();
  });
});
