import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import { User } from '@application/entities/user/user';
import { Email } from '@application/entities/user/email';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}

@Injectable()
export class LoginGithub {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async fetchGithubUser(access_token: string) {
    const response = await axios.get<IUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          Accept: 'application/json',
          authorization: `Bearer ${access_token}`,
        },
      },
    );

    const { name, avatar_url, email, id } = response.data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      const newUser = new User({
        name,
        email: new Email(email),
        avatar: avatar_url,
      });

      await this.usersRepository.create(newUser);

      const payload = { email: email, sub: id };

      return {
        token: this.jwtService.sign(payload),
        user: {
          id: newUser.id,
          name: newUser.name,
          avatar: newUser.avatar,
        },
      };
    }

    const payload = { email: email, sub: id };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }

  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_API_CLIENT_ID,
          client_secret: process.env.GITHUB_API_SECRET_KEY,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      });

    const user = await this.fetchGithubUser(accessTokenResponse.access_token);

    return user;
  }
}
