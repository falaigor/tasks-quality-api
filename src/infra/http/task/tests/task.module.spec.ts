import { TaskModule } from '../task.module';

describe('TaskModule', () => {
  it('should compile the module', async () => {
    const module = new TaskModule();

    expect(module).toBeDefined();
  });
});
