import { FinishIssue } from '../finish-issue';
import { IssueNotFound } from '../errors/issue-not-found.error';
import { makeIssue } from '@test/factories/issue.factory';
import { InMemoryIssuesRepository } from '@test/repositories/in-memory-issues.repository';

describe('Finish issue', () => {
  it('should be able to finish a issue', async () => {
    const issuesRepository = new InMemoryIssuesRepository();
    const finishIssue = new FinishIssue(issuesRepository);

    const issue = makeIssue();

    await issuesRepository.create(issue);

    await finishIssue.execute({
      issueId: issue.id,
    });

    expect(issuesRepository.issues[0].finishedAt).toEqual(issue.finishedAt);
  });

  it('should not be able to finish a non existing issue', async () => {
    const issuesRepository = new InMemoryIssuesRepository();
    const finishIssue = new FinishIssue(issuesRepository);

    expect(
      finishIssue.execute({
        issueId: 'fake-issue-id',
      }),
    ).rejects.toThrow(IssueNotFound);
  });
});
