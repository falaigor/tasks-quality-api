import { PrismaIssueMapper } from './prisma-issue.mapper';
import { Issue } from '@application/entities/issue/issue';

describe('Prisma Issue mapper', () => {
  it('should be able to return a issue mapper to Domain', () => {
    const issue = PrismaIssueMapper.toDomain({
      id: '961c5772-c0a6-4eb5-90f0-093141ff789d',
      taskId: 'dbe484fb-c8d7-464f-a05f-67417766f177',
      description: 'issue description',
      canceledAt: new Date('2022-12-24T19:58:53.917Z'),
      finishedAt: null,
      createdAt: new Date('2022-12-24T19:58:53.917Z'),
    });

    const raw = {
      _id: issue.id,
      props: {
        taskId: issue.taskId,
        description: issue.description,
        canceledAt: issue.canceledAt,
        finishedAt: issue.finishedAt,
        createdAt: issue.createdAt,
      },
    };

    expect(issue).toEqual(raw);
  });

  it('should be able to return a task mapper to Prisma', () => {
    const raw = new Issue({
      taskId: 'dbe484fb-c8d7-464f-a05f-67417766f177',
      description: 'task.description',
      canceledAt: new Date('2022-12-24T19:58:53.917Z'),
      finishedAt: new Date('2022-12-24T19:58:53.917Z'),
      createdAt: new Date('2022-12-24T19:58:53.917Z'),
    });

    const issue = {
      id: raw.id,
      taskId: raw.taskId,
      description: raw.description,
      canceledAt: raw.canceledAt,
      finishedAt: raw.finishedAt,
      createdAt: raw.createdAt,
    };

    expect(PrismaIssueMapper.toPrisma(raw)).toEqual(issue);
  });
});
