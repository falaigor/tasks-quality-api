import { ChangeAvatarUser } from '../change-avatar-user';
import { UserNotFound } from '../errors/user-not-found.error';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

describe('Change avatar user', () => {
  it('should be able to change avatar a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const changeAvatarUser = new ChangeAvatarUser(usersRepository);

    const user = makeUser();

    await usersRepository.create(user);

    await changeAvatarUser.execute({
      userId: user.id,
      avatar: 'avatar.png',
    });

    expect(usersRepository.users[0].avatar).toEqual('avatar.png');
  });

  it('should not be able to change avatar a non existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const changeAvatarUser = new ChangeAvatarUser(usersRepository);

    expect(
      changeAvatarUser.execute({
        userId: 'fake-user-id',
        avatar: 'avatar.png',
      }),
    ).rejects.toThrow(UserNotFound);
  });
});
