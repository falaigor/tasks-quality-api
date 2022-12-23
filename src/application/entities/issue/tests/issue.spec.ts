import { Issue } from '../issue';

describe('Issue', () => {
  it('should be able to create a new Issue', () => {
    const issue = new Issue({
      taskId: 'task-id',
      description: 'description of issue',
    });

    expect(issue).toBeTruthy();
  });
});
