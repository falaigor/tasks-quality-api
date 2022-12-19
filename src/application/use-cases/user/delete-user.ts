import { UsersRepository } from '@application/repositories/users.repository';
import { UserNotFound } from './errors/user-not-found.error';

interface DeleteUserRequest {
  userId: string;
}

type DeleteUserResponse = void;

export class DeleteUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    await this.usersRepository.delete(user);
  }
}
