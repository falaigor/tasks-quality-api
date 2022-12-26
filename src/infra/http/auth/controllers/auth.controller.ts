import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('session/github')
  async loginGithub(@Body() body: { code: string }) {
    const { code } = body;

    return await this.authService.execute(code);
  }
}
