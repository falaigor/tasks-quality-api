import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { IssuesController } from './issues.controller';
import { IssuesRepository } from '@application/repositories/issues.repository';
import { AddIssue } from '@application/use-cases/issue/add-issue';
import { GetTaskIssues } from '@application/use-cases/issue/get-task-issues';
import { FinishIssue } from '@application/use-cases/issue/finish-issue';
import { CancelIssue } from '@application/use-cases/issue/cancel-issue';
import { CreateIssueBody } from '../dtos/create-issue-body';
import { IssueNotFound } from '@application/use-cases/issue/errors/issue-not-found.error';

describe('Issues Controller', () => {
  let issuesController: IssuesController;
  let issuesRepository: IssuesRepository;

  const IssuesRepositoryProvider = {
    provide: IssuesRepository,
    useFactory: () => ({
      create: jest.fn(() => []),
      findById: jest.fn(() => []),
      findManyByTaskId: jest.fn(() => []),
      countManyByTaskId: jest.fn(() => []),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuesController],
      providers: [
        PrismaService,
        IssuesRepositoryProvider,
        AddIssue,
        GetTaskIssues,
        FinishIssue,
        CancelIssue,
      ],
    }).compile();

    issuesController = module.get<IssuesController>(IssuesController);
    issuesRepository = module.get<IssuesRepository>(IssuesRepository);
  });

  it('should be defined', async () => {
    expect(issuesController).toBeDefined();
  });

  describe('Create', () => {
    it('should be able not equal the null', async () => {
      const dto = new CreateIssueBody();

      expect(issuesController.create(dto)).not.toEqual(null);
    });

    it('should be able to create a new issue', async () => {
      const dto = new CreateIssueBody();
      const { issue } = await issuesController.create(dto);

      const returnIssue = {
        _id: issue.id,
        props: {
          description: issue.description,
          canceledAt: issue.canceledAt,
          finishedAt: issue.finishedAt,
          createdAt: issue.createdAt,
        },
      };

      expect(issuesRepository.create).toHaveBeenCalled();
      expect(issuesRepository.create).toBeCalledWith(returnIssue);
    });
  });

  it('calling getFromTask method', async () => {
    issuesController.getFromTask('task-id');
    expect(issuesRepository.findManyByTaskId).toHaveBeenCalled();
  });

  describe('Finish', () => {
    it('calling finish method', async () => {
      issuesController.finish('issue-id');
      expect(issuesRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error Issue not found', async () => {
      issuesController.finish = () =>
        new Promise((resolve, reject) => {
          throw new IssueNotFound();
        });

      const result = issuesController.finish('issue-id');

      await expect(result).rejects.toThrow('Issue not found');
    });
  });

  describe('Cancel', () => {
    it('calling cancel method', async () => {
      issuesController.cancel('issue-id');
      expect(issuesRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error Issue not found', async () => {
      issuesController.cancel = () =>
        new Promise((resolve, reject) => {
          throw new IssueNotFound();
        });

      const result = issuesController.cancel('issue-id');

      await expect(result).rejects.toThrow('Issue not found');
    });
  });
});
