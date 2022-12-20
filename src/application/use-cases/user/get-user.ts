import { User } from '@application/entities/user/user';
import { UsersRepository } from '@application/repositories/users.repository';
import { UserNotFound } from './errors/user-not-found.error';
import { Injectable } from '@nestjs/common';

interface GetUserRequest {
  userId: string;
}

interface GetUserResponse {
  user: User;
}

@Injectable()
export class GetUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    return { user };
  }
}
