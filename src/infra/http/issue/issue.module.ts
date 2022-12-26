import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { IssuesController } from './controllers/issues.controller';
import { AddIssue } from '@application/use-cases/issue/add-issue';
import { GetTaskIssues } from '@application/use-cases/issue/get-task-issues';
import { FinishIssue } from '@application/use-cases/issue/finish-issue';
import { CancelIssue } from '@application/use-cases/issue/cancel-issue';

@Module({
  imports: [DatabaseModule],
  controllers: [IssuesController],
  providers: [AddIssue, GetTaskIssues, FinishIssue, CancelIssue],
})
export class IssueModule {}
