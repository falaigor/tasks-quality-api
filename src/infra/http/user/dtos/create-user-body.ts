import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @Length(3, 240)
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  avatar: string;
}
