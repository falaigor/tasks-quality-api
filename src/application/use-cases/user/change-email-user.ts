import { Injectable } from '@nestjs/common';
import { Email } from '@application/entities/user/email';
import { UserNotFound } from './errors/user-not-found.error';
import { UsersRepository } from '@application/repositories/users.repository';

interface ChangeEmailUserRequest {
  userId: string;
  email: Email;
}

type ChangeEmailUserResponse = void;

@Injectable()
export class ChangeEmailUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: ChangeEmailUserRequest,
  ): Promise<ChangeEmailUserResponse> {
    const { userId, email } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    user.email = email;

    await this.usersRepository.save(user);
  }
}
