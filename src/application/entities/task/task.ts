import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';
import { Status } from './status';

export interface TaskProps {
  userId: string;
  title: string;
  description?: string | null;
  status: string;
  startedAt?: Date | null;
  dueDateAt?: Date | null;
  finishedAt?: Date | null;
  urlTask?: string | null;
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
      status: props.status ?? Status.WAITING,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set description(description: string | null | undefined) {
    this.props.description = description;
  }

  public get description(): string | null | undefined {
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

  public set dueDateAt(dueDateAt: Date | null | undefined) {
    this.props.dueDateAt = dueDateAt;
  }

  public get dueDateAt(): Date | null | undefined {
    return this.props.dueDateAt;
  }

  public finish() {
    this.props.finishedAt = new Date();
  }

  public get finishedAt(): Date | null | undefined {
    return this.props.finishedAt;
  }

  public set urlTask(urlTask: string | null | undefined) {
    this.props.urlTask = urlTask;
  }

  public get urlTask(): string | null | undefined {
    return this.props.urlTask;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
