import { Issue } from '@application/entities/issue/issue';

export abstract class IssuesRepository {
  abstract create(issue: Issue): Promise<void>;
  abstract save(issue: Issue): Promise<void>;
  abstract findById(issueId: string): Promise<Issue | null>;
  abstract findManyByTaskId(taskId: string): Promise<Issue[]>;
  abstract countManyByTaskId(taskId: string): Promise<number>;
}
