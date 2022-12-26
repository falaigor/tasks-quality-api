import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

import { DatabaseModule } from '@infra/database/database.module';
import { UserModule } from '@infra/http/user/user.module';

import { LoginGithub } from '@application/use-cases/auth/login-github';

describe('Issues Controller', () => {
  let authController: AuthController;
  let loginGithub: LoginGithub;

  const LoginGithubProvider = {
    provide: LoginGithub,
    useFactory: () => ({
      execute: jest.fn(() => []),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        DatabaseModule,
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, LoginGithubProvider],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    loginGithub = module.get<LoginGithub>(LoginGithub);
  });

  it('should be defined', async () => {
    expect(authController).toBeDefined();
  });

  it('should be able to called auth route', async () => {
    const body = {
      code: '123-asd-123',
    };

    await authController.loginWithGithub(body);

    expect(loginGithub.execute).toHaveBeenCalled();
  });
});
