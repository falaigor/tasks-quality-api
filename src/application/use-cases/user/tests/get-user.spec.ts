import { GetAllUsers } from '../get-all-users';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

describe('Get user', () => {
  it('should be able to get a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetAllUsers(usersRepository);

    const user = makeUser();

    await usersRepository.create(user);
    await usersRepository.create(user);

    await getUser.execute();

    expect(usersRepository.users).toHaveLength(2);
  });
});
