import { DatabaseModule } from '../database.module';

describe('Database Module', () => {
  it('should compile the module', async () => {
    const module = new DatabaseModule();

    expect(module).toBeDefined();
  });
});
