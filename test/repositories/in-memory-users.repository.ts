import { User } from '@application/entities/user/user';
import { UsersRepository } from '@application/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User) {
    this.users.push(user);
  }
}
