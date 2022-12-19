import { DeactivateUser } from '../deactivate-user';
import { UserNotFound } from '../errors/user-not-found.error';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

describe('Deactivate user', () => {
  it('should be able to deactivate a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const deactivateUser = new DeactivateUser(usersRepository);

    const user = makeUser();

    await usersRepository.create(user);

    await deactivateUser.execute({
      userId: user.id,
    });

    expect(usersRepository.users[0].status).toEqual('inactive');
  });

  it('should not be able to deactivate a non existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const deactivateUser = new DeactivateUser(usersRepository);

    expect(
      deactivateUser.execute({
        userId: 'fake-user-id',
      }),
    ).rejects.toThrow(UserNotFound);
  });
});
