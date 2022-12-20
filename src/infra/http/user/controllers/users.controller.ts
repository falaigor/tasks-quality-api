import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { User } from '@application/entities/user/user';
import { GetAllUsers } from '../../../../application/use-cases/user/get-all-users';

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

  @Patch(':userId/deactivate')
  async deactivate(@Param('userId') userId: string) {
    await this.deactivateUser.execute({ userId });
  }

  @Patch(':userId/change-email')
  async changeEmail(
    @Param('userId') userId: string,
    @Body() body: { email: string },
  ) {
    const { email } = body;
    await this.changeEmailUser.execute({ userId, email: new Email(email) });
  }

  @Patch(':userId/change-avatar')
  async changeAvatar(
    @Param('userId') userId: string,
    @Body() body: { avatar: string },
  ) {
    const { avatar } = body;
    await this.changeAvatarUser.execute({ userId, avatar });
  }

  @Get()
  async getAll() {
    const { users } = await this.getAllUsers.execute();

    return {
      users: users.map(UserViewModel.toHTTP),
    };
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    const { user } = await this.getUser.execute({
      userId,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, avatar } = body;

    const { user } = await this.createUser.execute({
      name,
      email,
      avatar,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Delete(':userId/delete')
  async delete(@Param('userId') userId: string) {
    await this.deleteUser.execute({ userId });
  }
}
