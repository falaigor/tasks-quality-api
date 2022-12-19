import { Email } from '@application/entities/user/email';
import { DeleteUser } from '../delete-user';
import { UserNotFound } from '../errors/user-not-found.error';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

describe('Delete user', () => {
  it('should be able to delete a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const deleteUser = new DeleteUser(usersRepository);

    await usersRepository.create(makeUser());
    await usersRepository.create(
      makeUser({
        name: 'User Two',
        email: new Email('user-two@email.com'),
      }),
    );

    const user = makeUser({
      name: 'Igor Santos',
      email: new Email('umaemail@maneiro.com'),
      avatar: 'image.jpg',
    });

    await usersRepository.create(user);

    await deleteUser.execute({
      userId: user.id,
    });

    expect(usersRepository.users).toHaveLength(2);
  });

  it('should not be able to delete a non existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const deleteUser = new DeleteUser(usersRepository);

    expect(
      deleteUser.execute({
        userId: 'fake-user-id',
      }),
    ).rejects.toThrow(UserNotFound);
  });
});
