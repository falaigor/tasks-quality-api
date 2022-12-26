import { Issue } from '@application/entities/issue/issue';

export class IssueViewModel {
  static toHTTP(issue: Issue) {
    return {
      id: issue.id,
      taskId: issue.taskId,
      description: issue.description,
      canceledAt: issue.canceledAt,
      finishedAt: issue.finishedAt,
      createdAt: issue.createdAt,
    };
  }
}
