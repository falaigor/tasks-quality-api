import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskBody {
  @IsNotEmpty()
  @Length(3, 240)
  title: string;

  @IsNotEmpty()
  userId: string;

  description: string;
  urlTask: string;
  startedAt: Date;
  dueDateAt: Date;
}
