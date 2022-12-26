import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { DatabaseModule } from '@infra/database/database.module';
import { UserModule } from '@infra/http/user/user.module';
import { AuthController } from './controllers/auth.controller';

import { AuthService } from './services/auth.service';

import { LoginGithub } from '@application/use-cases/auth/login-github';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginGithub, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
