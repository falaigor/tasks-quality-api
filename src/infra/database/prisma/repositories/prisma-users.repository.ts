import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@application/entities/user/user';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { UsersRepository } from '@application/repositories/users.repository';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(userId: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: raw,
    });
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async delete(user: User): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
