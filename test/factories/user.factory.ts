import { Email } from '@application/entities/user/email';
import { User, UserProps } from '@application/entities/user/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: 'User1',
    email: new Email('email@email.com'),
    avatar: 'image.jpg',
    status: 'active',
    ...override,
  });
}
