import { IssueModule } from '../issue.module';

describe('Issue Module', () => {
  it('should compile the module', async () => {
    const module = new IssueModule();

    expect(module).toBeDefined();
  });
});
