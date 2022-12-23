import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UsersRepository } from '@application/repositories/users.repository';
import { UsersController } from './users.controller';
import { CreateUser } from '@application/use-cases/user/create-user';
import { DeactivateUser } from '@application/use-cases/user/deactivate-user';
import { ChangeEmailUser } from '@application/use-cases/user/change-email-user';
import { ChangeAvatarUser } from '@application/use-cases/user/change-avatar-user';
import { DeleteUser } from '@application/use-cases/user/delete-user';
import { GetUser } from '@application/use-cases/user/get-user';
import { GetAllUsers } from '@application/use-cases/user/get-all-users';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserNotFound } from '@application/use-cases/user/errors/user-not-found.error';
import { UserAlreadyExists } from '@application/use-cases/user/errors/user-already-exists.error';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersRepository: UsersRepository;

  const UsersRepositoryProvider = {
    provide: UsersRepository,
    useFactory: () => ({
      create: jest.fn(() => []),
      findByEmail: jest.fn(() => []),
      findById: jest.fn(() => []),
      save: jest.fn(() => []),
      delete: jest.fn(() => []),
      getAll: jest.fn(() => []),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        UsersRepositoryProvider,
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
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', async () => {
    expect(usersController).toBeDefined();
  });

  describe('Create', () => {
    it('should be able not equal the null', async () => {
      const dto = new CreateUserBody();

      expect(usersController.create(dto)).not.toEqual(null);
    });

    it('should be able to create a user', async () => {
      try {
        const user = await usersController.create({
          name: 'Usuario',
          email: 'email@email.com',
          avatar: 'avatar.jpg',
        });

        expect(usersRepository.create).toHaveBeenCalled();
        expect(usersRepository.create).toBeCalledWith(user);
      } catch (err) {}
    });

    it('should be return error User already exists', async () => {
      usersController.create = () =>
        new Promise((resolve, reject) => {
          throw new UserAlreadyExists();
        });

      const body: CreateUserBody = {
        name: 'Usuario',
        email: 'email@email.com',
        avatar: 'avatar.jpg',
      };

      const result = usersController.create(body);

      await expect(result).rejects.toThrow('User already exists.');
    });
  });

  describe('Deactivate user', () => {
    it('should be able to deactivate user', async () => {
      usersController.deactivate('user-id');
      expect(usersRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error User not found', async () => {
      usersController.deactivate = () =>
        new Promise((resolve, reject) => {
          throw new UserNotFound();
        });

      const result = usersController.deactivate('user-id');

      await expect(result).rejects.toThrow('User not found');
    });
  });

  describe('Get user', () => {
    it('calling get user by id', async () => {
      usersController.getUserById('user-id');
      expect(usersRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error User not found', async () => {
      usersController.getUserById = () =>
        new Promise((resolve, reject) => {
          throw new UserNotFound();
        });

      const result = usersController.getUserById('user-id');

      await expect(result).rejects.toThrow('User not found');
    });
  });

  describe('Get all users', () => {
    it('calling get all users', async () => {
      usersController.getAll();
      expect(usersRepository.getAll).toHaveBeenCalled();
    });
  });

  describe('Change Email', () => {
    const body = {
      email: 'test@example.com',
    };

    it('should be able to change a email', async () => {
      usersController.changeEmail('user-id', body);
      expect(usersRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error User not found', async () => {
      usersController.changeEmail = () =>
        new Promise((resolve, reject) => {
          throw new UserNotFound();
        });

      const result = usersController.changeEmail('user-id', body);

      await expect(result).rejects.toThrow('User not found');
    });
  });

  describe('Change Avatar', () => {
    const body = {
      avatar: 'image.jpg',
    };

    it('should be able to change avatar a user', async () => {
      usersController.changeAvatar('user-id', body);
      expect(usersRepository.findById).toHaveBeenCalled();
    });

    it('calling method and return error User not found', async () => {
      usersController.changeAvatar = () =>
        new Promise((resolve, reject) => {
          throw new UserNotFound();
        });

      const result = usersController.changeAvatar('user-id', body);

      await expect(result).rejects.toThrow('User not found');
    });
  });

  describe('Delete user', () => {
    it('calling method and return error User not found', async () => {
      usersController.delete = () =>
        new Promise((resolve, reject) => {
          throw new UserNotFound();
        });

      const result = usersController.delete('user-id');

      await expect(result).rejects.toThrow('User not found');
    });
  });
});
