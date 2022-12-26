import { Issue } from '@application/entities/issue/issue';
import { IssuesRepository } from '@application/repositories/issues.repository';
import { Injectable } from '@nestjs/common';

interface AddIssueRequest {
  taskId: string;
  description: string;
}

interface AddIssueResponse {
  issue: Issue;
}

@Injectable()
export class AddIssue {
  constructor(private issuesRepository: IssuesRepository) {}

  async execute(request: AddIssueRequest): Promise<AddIssueResponse> {
    const { taskId, description } = request;

    const issue = new Issue({
      taskId,
      description,
    });

    await this.issuesRepository.create(issue);

    return { issue };
  }
}
