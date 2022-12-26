import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  email: string;
  userId: string;
}

@Injectable()
export class LoginGithub {
  constructor(private jwtService: JwtService) {}

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

    const response = await axios.get<IUserResponse>(
      'http://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      },
    );

    const { email, id } = response.data;

    const payload = { email: email, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
