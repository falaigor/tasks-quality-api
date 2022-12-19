import { UsersRepository } from '@application/repositories/users.repository';
import { UserNotFound } from './errors/user-not-found.error';

interface ChangeAvatarUserRequest {
  userId: string;
  avatar: string;
}

export class ChangeAvatarUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: ChangeAvatarUserRequest) {
    const { userId, avatar } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    user.avatar = avatar;

    await this.usersRepository.save(user);
  }
}
