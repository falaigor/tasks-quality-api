import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddIssue } from '@application/use-cases/issue/add-issue';
import { CancelIssue } from '@application/use-cases/issue/cancel-issue';
import { FinishIssue } from '@application/use-cases/issue/finish-issue';
import { GetTaskIssues } from '@application/use-cases/issue/get-task-issues';
import { IssueNotFound } from '@application/use-cases/issue/errors/issue-not-found.error';
import { CreateIssueBody } from '../dtos/create-issue-body';
import { IssueViewModel } from '../view-models/task.view-model';
import { JwtAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';

@Controller('issues')
export class IssuesController {
  constructor(
    private addIssue: AddIssue,
    private cancelIssue: CancelIssue,
    private finishIssue: FinishIssue,
    private getTaskIssues: GetTaskIssues,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':issueId/cancel')
  async cancel(@Param('issueId') issueId: string) {
    try {
      await this.cancelIssue.execute({ issueId });
    } catch (err) {
      if (err instanceof IssueNotFound) {
        throw new HttpException('Issue not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':issueId/finish')
  async finish(@Param('issueId') issueId: string) {
    try {
      await this.finishIssue.execute({ issueId });
    } catch (err) {
      if (err instanceof IssueNotFound) {
        throw new HttpException('Issue not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('from/:taskId')
  async getFromTask(@Param('taskId') taskId: string) {
    const { issues } = await this.getTaskIssues.execute({
      taskId,
    });

    return {
      tasks: issues.map(IssueViewModel.toHTTP),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateIssueBody) {
    const { taskId, description } = body;
    const { issue } = await this.addIssue.execute({
      taskId,
      description,
    });

    return {
      issue: IssueViewModel.toHTTP(issue),
    };
  }
}
