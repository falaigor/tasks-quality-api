import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@application/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  //https://accounts.google.com/o/oauth2/v2/auth
}
