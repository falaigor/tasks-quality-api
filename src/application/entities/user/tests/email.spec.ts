import { Email } from '../email';
describe('User email', () => {
  it('should be able to create a user email', () => {
    const email = new Email('email@example.com');

    expect(email).toBeTruthy();
  });

  it('should be not able to create a user email with invalid email', () => {
    expect(() => new Email('email@example.')).toThrow();
  });
});
