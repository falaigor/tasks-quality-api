export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private validateEmail(email: string) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return emailRegex.test(email);
  }

  constructor(email: string) {
    const isValidEmail = this.validateEmail(email);

    if (!isValidEmail) {
      throw new Error('Invalid email.');
    }

    this.email = email;
  }
}
