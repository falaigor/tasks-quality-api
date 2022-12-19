import { UsersRepository } from '@application/repositories/users.repository';
import { UserNotFound } from './errors/user-not-found.error';

interface DeactivateUserRequest {
  userId: string;
}

type DeactivateUserResponse = void;

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
