import { Body, Controller, Post } from '@nestjs/common';

import { LoginGithub } from '@application/use-cases/auth/login-github';

@Controller('auth')
export class AuthController {
  constructor(private loginGithub: LoginGithub) {}

  @Post('session/github')
  async loginWithGithub(@Body() body: { code: string }) {
    const { code } = body;

    return await this.loginGithub.execute(code);
  }
}
