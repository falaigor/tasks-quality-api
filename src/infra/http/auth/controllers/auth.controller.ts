import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginGithub } from '@application/use-cases/auth/login-github';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loginGithub: LoginGithub,
  ) {}

  @Post('session/github')
  async loginWithGithub(@Body() body: { code: string }) {
    const { code } = body;

    return await this.loginGithub.execute(code);
  }

  // @Post('session/google')
  // async loginGoogle(@Body() body: { access_token: string }) {
  //   const { access_token } = body;

  //   return await this.authService.execute(access_token);
  // }
}
