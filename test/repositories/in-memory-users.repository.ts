import { User } from '@application/entities/user/user';
import { UsersRepository } from '@application/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = this.users;
    return users;
  }

  async create(user: User) {
    this.users.push(user);
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }

  async delete(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
    }
  }
}
