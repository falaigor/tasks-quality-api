import { IssuesRepository } from '@application/repositories/issues.repository';
import { IssueNotFound } from './errors/issue-not-found.error';
import { Injectable } from '@nestjs/common';

interface CancelIssueRequest {
  issueId: string;
}

type CancelIssueResponse = void;

@Injectable()
export class CancelIssue {
  constructor(private issuesRepository: IssuesRepository) {}

  async execute(request: CancelIssueRequest): Promise<CancelIssueResponse> {
    const issue = await this.issuesRepository.findById(request.issueId);

    if (!issue) {
      throw new IssueNotFound();
    }

    issue.cancel();

    await this.issuesRepository.save(issue);
  }
}
