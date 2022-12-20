import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { UsersController } from './controllers/users.controller';
import { CreateUser } from '@application/use-cases/user/create-user';
import { DeactivateUser } from '@application/use-cases/user/deactivate-user';
import { ChangeEmailUser } from '@application/use-cases/user/change-email-user';
import { ChangeAvatarUser } from '@application/use-cases/user/change-avatar-user';
import { DeleteUser } from '@application/use-cases/user/delete-user';
import { GetUser } from '@application/use-cases/user/get-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    CreateUser,
    DeactivateUser,
    ChangeEmailUser,
    ChangeAvatarUser,
    DeleteUser,
    GetUser,
  ],
})
export class UserModule {}
