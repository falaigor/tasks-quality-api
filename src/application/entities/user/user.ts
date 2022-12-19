import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';
import { Email } from './email';

export interface UserProps {
  name: string;
  email: Email;
  avatar: string;
  createdAt: Date;
  status: 'active' | 'inactive';
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      { status?: 'active' | 'inactive'; createdAt?: Date }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? 'active',
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set avatar(avatar: string) {
    this.props.avatar = avatar;
  }

  public get avatar(): string {
    return this.props.avatar;
  }

  public deactivate() {
    this.props.status = 'inactive';
  }

  public get status(): 'active' | 'inactive' {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
