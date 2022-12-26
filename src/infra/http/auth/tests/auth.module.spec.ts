import { AuthModule } from '../auth.module';

describe('AuthModule', () => {
  it('should compile the module', async () => {
    const module = new AuthModule();

    expect(module).toBeDefined();
  });
});
