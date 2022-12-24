import { Issue } from '@application/entities/issue/issue';
import { IssuesRepository } from '@application/repositories/issues.repository';

export class InMemoryIssuesRepository implements IssuesRepository {
  public issues: Issue[] = [];

  async findById(issueId: string): Promise<Issue | null> {
    const issue = this.issues.find((item) => item.id === issueId);

    if (!issue) {
      return null;
    }

    return issue;
  }

  // async findManyByUserId(userId: string): Promise<Task[]> {
  //   return this.tasks.filter((item) => item.userId === userId);
  // }

  // async countManyByUserId(userId: string): Promise<number> {
  //   return this.tasks.filter((task) => task.userId === userId).length;
  // }

  async create(issue: Issue) {
    this.issues.push(issue);
  }

  async save(issue: Issue): Promise<void> {
    const issueIndex = this.issues.findIndex((item) => item.id === issue.id);

    if (issueIndex >= 0) {
      this.issues[issueIndex] = issue;
    }
  }
}