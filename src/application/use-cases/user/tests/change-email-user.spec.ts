import { ChangeEmailUser } from '../change-email-user';
import { makeUser } from '@test/factories/user.factory';
import { Email } from '@application/entities/user/email';
import { UserNotFound } from '../errors/user-not-found.error';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

describe('Change email user', () => {
  it('should be able to change email a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const changeEmailUser = new ChangeEmailUser(usersRepository);

    const user = makeUser();

    await usersRepository.create(user);

    await changeEmailUser.execute({
      userId: user.id,
      email: new Email('igor@email.com'),
    });

    expect(usersRepository.users[0].email.value).toEqual('igor@email.com');
  });

  it('should not be able to change email a non existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const changeEmailUser = new ChangeEmailUser(usersRepository);

    expect(
      changeEmailUser.execute({
        userId: 'fake-user-id',
        email: new Email('igor@email.com'),
      }),
    ).rejects.toThrow(UserNotFound);
  });
});
