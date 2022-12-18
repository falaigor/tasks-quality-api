import { Email } from '../email';
import { User } from '../user';

describe('User', () => {
  it('should be able to create a new user', () => {
    const user = new User({
      name: 'Igor',
      email: new Email('email@gmail.com'),
      avatar: 'image.jpg',
    });

    expect(user).toBeTruthy();
  });
});
