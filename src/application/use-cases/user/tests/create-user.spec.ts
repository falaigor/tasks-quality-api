import { CreateUser } from '../create-user';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute({
      name: 'Igor',
      email: 'igor@mail.com',
      avatar: 'image.jpg',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });

  it('should be not able to create a user when exists user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    await createUser.execute({
      name: 'User1',
      email: 'email@email.com',
      avatar: 'image.jpg',
    });

    expect(
      createUser.execute({
        name: 'user 2',
        email: 'email@email.com',
        avatar: 'image.jpg',
      }),
    ).rejects.toThrow();
  });
});
