import { UserModule } from '../user.module';

describe('UserModule', () => {
  it('should compile the module', async () => {
    const module = new UserModule();

    expect(module).toBeDefined();
  });
});
