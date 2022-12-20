import { User as RawUser } from '@prisma/client';
import { User } from '@application/entities/user/user';
import { Email } from '@application/entities/user/email';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      avatar: user.avatar,
      status: user.status,
      createdAt: user.createdAt,
    };
  }

  static toDomain(raw: RawUser) {
    return new User(
      {
        name: raw.name,
        email: new Email(raw.email),
        avatar: raw.avatar,
        status: raw.status,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }

  static toDomainAll(raw: RawUser) {
    return new User(
      {
        name: raw.name,
        email: new Email(raw.email),
        avatar: raw.avatar,
        status: raw.status,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
