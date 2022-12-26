import { IssuesRepository } from '@application/repositories/issues.repository';
import { IssueNotFound } from './errors/issue-not-found.error';
import { Injectable } from '@nestjs/common';

interface FinishIssueRequest {
  issueId: string;
}

type FinishIssueResponse = void;

@Injectable()
export class FinishIssue {
  constructor(private issuesRepository: IssuesRepository) {}

  async execute(request: FinishIssueRequest): Promise<FinishIssueResponse> {
    const { issueId } = request;

    const issue = await this.issuesRepository.findById(issueId);

    if (!issue) {
      throw new IssueNotFound();
    }

    issue.finish();

    await this.issuesRepository.save(issue);
  }
}
