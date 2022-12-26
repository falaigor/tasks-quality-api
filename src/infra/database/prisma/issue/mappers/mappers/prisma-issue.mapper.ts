import { Issue as RawIssue } from '@prisma/client';
import { Issue } from '@application/entities/issue/issue';

export class PrismaIssueMapper {
  static toPrisma(issue: Issue) {
    return {
      id: issue.id,
      taskId: issue.taskId,
      description: issue.description,
      finishedAt: issue.finishedAt,
      canceledAt: issue.canceledAt,
      createdAt: issue.createdAt,
    };
  }

  static toDomain(raw: RawIssue) {
    return new Issue(
      {
        taskId: raw.taskId,
        description: raw.description,
        finishedAt: raw.finishedAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
