import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { UsersController } from 'src/controllers/users/users.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
