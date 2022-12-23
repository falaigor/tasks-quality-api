import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UsersRepository } from '@application/repositories/users.repository';
import { PrismaUserRepository } from '@infra/database/prisma/user/repositories/prisma-users.repository';
import { UsersController } from './users.controller';
import { CreateUser } from '@application/use-cases/user/create-user';
import { DeactivateUser } from '@application/use-cases/user/deactivate-user';
import { ChangeEmailUser } from '@application/use-cases/user/change-email-user';
import { ChangeAvatarUser } from '@application/use-cases/user/change-avatar-user';
import { DeleteUser } from '@application/use-cases/user/delete-user';
import { GetUser } from '@application/use-cases/user/get-user';
import { GetAllUsers } from '@application/use-cases/user/get-all-users';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        {
          provide: UsersRepository,
          useClass: PrismaUserRepository,
        },
        CreateUser,
        DeactivateUser,
        ChangeEmailUser,
        ChangeAvatarUser,
        DeleteUser,
        GetUser,
        GetAllUsers,
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    expect(usersController).toBeDefined();
  });
});
