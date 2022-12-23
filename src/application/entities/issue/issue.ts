import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';

export interface IssueProps {
  taskId: string;
  description: string;
  finishedAt?: Date | null;
  createdAt: Date;
}

export class Issue {
  private _id: string;
  private props: IssueProps;

  constructor(props: Replace<IssueProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set taskId(taskId: string) {
    this.props.taskId = taskId;
  }

  public get taskId(): string {
    return this.props.taskId;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public get finishedAt(): Date | null | undefined {
    return this.props.finishedAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
