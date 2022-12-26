import { Issue } from '@application/entities/issue/issue';
import { IssuesRepository } from '@application/repositories/issues.repository';
import { Injectable } from '@nestjs/common';

interface GetTaskIssueRequest {
  taskId: string;
}

interface GetTaskIssuesResponse {
  issues: Issue[];
}

@Injectable()
export class GetTaskIssues {
  constructor(private issuesRepository: IssuesRepository) {}

  async execute(request: GetTaskIssueRequest): Promise<GetTaskIssuesResponse> {
    const { taskId } = request;

    const issues = await this.issuesRepository.findManyByTaskId(taskId);

    return {
      issues,
    };
  }
}
