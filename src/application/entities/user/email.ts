export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

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
