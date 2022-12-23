import { AddIssue } from '../add-issue';
import { InMemoryIssuesRepository } from '@test/repositories/in-memory-issues.repository';

describe('Add issue', () => {
  it('should be able to a add issue', async () => {
    const issuesRepository = new InMemoryIssuesRepository();
    const addIssue = new AddIssue(issuesRepository);

    const { issue } = await addIssue.execute({
      taskId: 'task-id',
      description: 'Uma descrição da task',
    });

    expect(issuesRepository.issues).toHaveLength(1);
    expect(issuesRepository.issues[0]).toEqual(issue);
  });
});
