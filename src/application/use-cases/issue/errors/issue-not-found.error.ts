export class IssueNotFound extends Error {
  constructor() {
    super('Issue not found.');
  }
}
