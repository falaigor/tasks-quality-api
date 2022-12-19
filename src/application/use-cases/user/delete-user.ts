import { Injectable } from '@nestjs/common';
import { UserNotFound } from './errors/user-not-found.error';
import { UsersRepository } from '@application/repositories/users.repository';

interface DeleteUserRequest {
  userId: string;
}

type DeleteUserResponse = void;

@Injectable()
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
