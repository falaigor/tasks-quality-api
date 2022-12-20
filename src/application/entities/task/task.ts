import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';

export interface TaskProps {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: string;
  startedAt?: Date | null;
  finishedAt?: Date | null;
  urlTask?: string;
  createdAt: Date;
}

export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(
    props: Replace<TaskProps, { status?: string; createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? 'waiting',
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set description(description: string | undefined) {
    this.props.description = description;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get status(): string {
    return this.props.status;
  }

  public set startedAt(startedAt: Date | null | undefined) {
    this.props.startedAt = startedAt;
  }

  public get startedAt(): Date | null | undefined {
    return this.props.startedAt;
  }

  public set finishedAt(finishedAt: Date | null | undefined) {
    this.props.finishedAt = finishedAt;
  }

  public get finishedAt(): Date | null | undefined {
    return this.props.finishedAt;
  }

  public set urlTask(urlTask: string | undefined) {
    this.props.urlTask = urlTask;
  }

  public get urlTask(): string | undefined {
    return this.props.urlTask;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
