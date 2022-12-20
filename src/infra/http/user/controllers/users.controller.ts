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

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private deactivateUser: DeactivateUser,
    private changeEmailUser: ChangeEmailUser,
    private changeAvatarUser: ChangeAvatarUser,
    private deleteUser: DeleteUser,
  ) {}

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    await this.deactivateUser.execute({ userId: id });
  }

  @Patch(':id/change-email')
  async changeEmail(@Param('id') id: string, @Body() body: { email: string }) {
    const { email } = body;
    await this.changeEmailUser.execute({ userId: id, email: new Email(email) });
  }

  @Patch(':id/change-avatar')
  async changeAvatar(
    @Param('id') id: string,
    @Body() body: { avatar: string },
  ) {
    const { avatar } = body;
    await this.changeAvatarUser.execute({ userId: id, avatar });
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

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    await this.deleteUser.execute({ userId: id });
  }
}
