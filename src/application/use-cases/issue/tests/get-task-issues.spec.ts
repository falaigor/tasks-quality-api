import { GetTaskIssues } from '../get-task-issues';
import { makeIssue } from '@test/factories/issue.factory';
import { InMemoryIssuesRepository } from '@test/repositories/in-memory-issues.repository';

describe('Get task issues', () => {
  it('should be able to get task issues', async () => {
    const issuesRepository = new InMemoryIssuesRepository();
    const getTaskIssues = new GetTaskIssues(issuesRepository);

    const task = makeIssue({
      taskId: 'task-id-one',
    });

    await issuesRepository.create(task);
    await issuesRepository.create(task);

    await issuesRepository.create(
      makeIssue({
        taskId: 'task-id-two',
      }),
    );

    const { issues } = await getTaskIssues.execute({
      taskId: task.taskId,
    });

    expect(issues).toHaveLength(2);
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ taskId: 'task-id-one' }),
        expect.objectContaining({ taskId: 'task-id-one' }),
      ]),
    );
  });
});
