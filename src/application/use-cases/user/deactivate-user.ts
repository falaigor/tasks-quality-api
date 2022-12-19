import { Injectable } from '@nestjs/common';
import { UserNotFound } from './errors/user-not-found.error';
import { UsersRepository } from '@application/repositories/users.repository';

interface DeactivateUserRequest {
  userId: string;
}

type DeactivateUserResponse = void;

@Injectable()
export class DeactivateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: DeactivateUserRequest,
  ): Promise<DeactivateUserResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    user.deactivate();

    await this.usersRepository.save(user);
  }
}
