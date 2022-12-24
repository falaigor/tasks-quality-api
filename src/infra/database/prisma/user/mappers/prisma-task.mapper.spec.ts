import { User } from '@application/entities/user/user';
import { PrismaUserMapper } from './prisma-user.mapper';
import { Email } from '@application/entities/user/email';

describe('User mapper', () => {
  it('should be able to return a user mapper to Domain', () => {
    const user = PrismaUserMapper.toDomain({
      id: '961c5772-c0a6-4eb5-90f0-093141ff789d',
      name: 'user name',
      email: 'user@email.com',
      avatar: 'avatar.jpg',
      status: 'active',
      createdAt: new Date('2022-12-24T19:58:53.917Z'),
    });

    const raw = {
      _id: user.id,
      props: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        status: user.status,
        createdAt: user.createdAt,
      },
    };

    expect(user).toEqual(raw);
  });

  it('should be able to return a user mapper to Prisma', () => {
    const raw = new User({
      name: 'user name',
      email: new Email('user@example.com'),
      avatar: 'avatar.jpg',
      status: 'active',
      createdAt: new Date('2022-12-24T19:58:53.917Z'),
    });

    const user = {
      id: raw.id,
      name: raw.name,
      email: raw.email.value,
      avatar: raw.avatar,
      status: raw.status,
      createdAt: raw.createdAt,
    };

    expect(PrismaUserMapper.toPrisma(raw)).toEqual(user);
  });
});
