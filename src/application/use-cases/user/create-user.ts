import { UsersRepository } from '@application/repositories/users.repository';
import { Email } from '@application/entities/user/email';
import { User } from '@application/entities/user/user';
import { UserAlreadyExists } from './errors/user-already-exists.error';

interface CreateUserRequest {
  name: string;
  email: string;
  avatar: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, avatar } = request;

    const user = new User({
      name,
      email: new Email(email),
      avatar,
    });

    const existsUser = await this.usersRepository.findByEmail(user.email.value);

    if (existsUser) {
      throw new UserAlreadyExists();
    }

    await this.usersRepository.create(user);

    return { user };
  }
}
