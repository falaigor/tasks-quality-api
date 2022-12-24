import { CancelIssue } from '../cancel-issue';
import { IssueNotFound } from '../errors/issue-not-found.error';
import { makeIssue } from '@test/factories/issue.factory';
import { InMemoryIssuesRepository } from '@test/repositories/in-memory-issues.repository';

describe('Cancel issue', () => {
  it('should be able to cancel a issue', async () => {
    const issuesRepository = new InMemoryIssuesRepository();
    const cancelIssue = new CancelIssue(issuesRepository);

    const issue = makeIssue();

    await issuesRepository.create(issue);

    await cancelIssue.execute({
      issueId: issue.id,
    });

    expect(issuesRepository.issues[0].canceledAt).toEqual(issue.canceledAt);
  });

  it('should not be able to cancel a non existing issue', async () => {
    const issuesRepository = new InMemoryIssuesRepository();
    const cancelIssue = new CancelIssue(issuesRepository);

    expect(
      cancelIssue.execute({
        issueId: 'fake-issue-id',
      }),
    ).rejects.toThrow(IssueNotFound);
  });
});
