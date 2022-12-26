import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user.view-model';
import { Email } from '@application/entities/user/email';
import { CreateUser } from '@application/use-cases/user/create-user';
import { DeleteUser } from '@application/use-cases/user/delete-user';
import { DeactivateUser } from '@application/use-cases/user/deactivate-user';
import { ChangeEmailUser } from '@application/use-cases/user/change-email-user';
import { ChangeAvatarUser } from '@application/use-cases/user/change-avatar-user';
import { GetUser } from '@application/use-cases/user/get-user';
import { GetAllUsers } from '@application/use-cases/user/get-all-users';
import { UserNotFound } from '@application/use-cases/user/errors/user-not-found.error';
import { UserAlreadyExists } from '@application/use-cases/user/errors/user-already-exists.error';
import { JwtAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private deactivateUser: DeactivateUser,
    private changeEmailUser: ChangeEmailUser,
    private changeAvatarUser: ChangeAvatarUser,
    private deleteUser: DeleteUser,
    private getUser: GetUser,
    private getAllUsers: GetAllUsers,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/deactivate')
  async deactivate(@Param('userId') userId: string) {
    try {
      await this.deactivateUser.execute({ userId });
    } catch (err) {
      if (err instanceof UserNotFound) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/change-email')
  async changeEmail(
    @Param('userId') userId: string,
    @Body() body: { email: string },
  ) {
    try {
      const { email } = body;
      await this.changeEmailUser.execute({ userId, email: new Email(email) });
    } catch (err) {
      if (err instanceof UserNotFound) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/change-avatar')
  async changeAvatar(
    @Param('userId') userId: string,
    @Body() body: { avatar: string },
  ) {
    try {
      const { avatar } = body;
      await this.changeAvatarUser.execute({ userId, avatar });
    } catch (err) {
      if (err instanceof UserNotFound) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    const { users } = await this.getAllUsers.execute();

    return {
      users: users.map(UserViewModel.toHTTP),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    try {
      const { user } = await this.getUser.execute({
        userId,
      });

      return {
        user: UserViewModel.toHTTP(user),
      };
    } catch (err) {
      if (err instanceof UserNotFound) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateUserBody) {
    try {
      const { name, email, avatar } = body;
      const { user } = await this.createUser.execute({
        name,
        email,
        avatar,
      });

      return {
        user: UserViewModel.toHTTP(user),
      };
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/delete')
  async delete(@Param('userId') userId: string) {
    try {
      await this.deleteUser.execute({ userId });
    } catch (err) {
      if (err instanceof UserNotFound) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
