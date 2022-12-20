import { User } from '@application/entities/user/user';
import { UsersRepository } from '@application/repositories/users.repository';
import { Injectable } from '@nestjs/common';

interface GetAllUsersResponse {
  users: User[];
}

@Injectable()
export class GetAllUsers {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersResponse> {
    const users = await this.usersRepository.getAll();

    return { users };
  }
}
