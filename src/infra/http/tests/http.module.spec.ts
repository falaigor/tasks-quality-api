import { HttpModule } from '../http.module';

describe('HttpModule', () => {
  it('should compile the module', async () => {
    const module = new HttpModule();

    expect(module).toBeDefined();
  });
});
