import { IsNotEmpty } from 'class-validator';

export class CreateIssueBody {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  taskId: string;
}
