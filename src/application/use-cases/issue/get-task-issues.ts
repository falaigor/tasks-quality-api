import { Issue } from '@application/entities/issue/issue';
import { IssuesRepository } from '@application/repositories/issues.repository';

interface GetTaskIssueRequest {
  taskId: string;
}

interface GetTaskIssuesResponse {
  issues: Issue[];
}

export class GetTaskIssues {
  constructor(private issuesRepository: IssuesRepository) {}

  async execute(request: GetTaskIssueRequest): Promise<GetTaskIssuesResponse> {
    const issues = await this.issuesRepository.findManyByTaskId(request.taskId);

    return {
      issues,
    };
  }
}
