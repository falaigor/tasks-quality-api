import { GetUser } from '../get-user';
import { UserNotFound } from '../errors/user-not-found.error';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

describe('Get user', () => {
  it('should be able to get a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetUser(usersRepository);

    const user = makeUser();

    await usersRepository.create(user);

    await getUser.execute({
      userId: user.id,
    });

    expect(usersRepository.users).toHaveLength(1);
  });

  it('should not be able to get a non existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetUser(usersRepository);

    expect(
      getUser.execute({
        userId: 'fake-user-id',
      }),
    ).rejects.toThrow(UserNotFound);
  });
});
