import { PrismaService } from '../../prisma.service';
import { Issue } from '@application/entities/issue/issue';
import { PrismaIssueMapper } from '../mappers/prisma-issue.mapper';
import { IssuesRepository } from '@application/repositories/issues.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaIssueRepository implements IssuesRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(issueId: string): Promise<Issue | null> {
    const issue = await this.prismaService.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!issue) {
      return null;
    }

    return PrismaIssueMapper.toDomain(issue);
  }

  async findManyByTaskId(taskId: string): Promise<Issue[]> {
    const issues = await this.prismaService.issue.findMany({
      where: {
        taskId,
      },
    });

    return issues.map(PrismaIssueMapper.toDomain);
  }

  async countManyByTaskId(taskId: string): Promise<number> {
    const count = await this.prismaService.issue.count({
      where: {
        taskId,
      },
    });

    return count;
  }

  async create(issue: Issue): Promise<void> {
    const raw = PrismaIssueMapper.toPrisma(issue);

    await this.prismaService.issue.create({
      data: raw,
    });
  }

  async save(issue: Issue): Promise<void> {
    const raw = PrismaIssueMapper.toPrisma(issue);

    await this.prismaService.issue.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
