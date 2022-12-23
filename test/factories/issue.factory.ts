import { Issue, IssueProps } from '@application/entities/issue/issue';

type Override = Partial<IssueProps>;

export function makeIssue(override: Override = {}) {
  return new Issue({
    taskId: 'make-task-id',
    description: 'issue description',
    ...override,
  });
}
