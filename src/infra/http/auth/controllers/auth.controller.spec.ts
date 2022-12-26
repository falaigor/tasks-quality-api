import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { DatabaseModule } from '@infra/database/database.module';
import { UserModule } from '@infra/http/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

describe('Issues Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  const AuthServiceProvider = {
    provide: AuthService,
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
      providers: [AuthService, LocalStrategy, JwtStrategy, AuthServiceProvider],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {
    expect(authController).toBeDefined();
  });

  it('should be able to called auth route', async () => {
    const body = {
      code: '123-asd-123',
    };

    await authController.loginGithub(body);

    expect(authService.execute).toHaveBeenCalled();
  });
});
