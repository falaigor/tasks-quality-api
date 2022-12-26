import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { IssueModule } from './issue/issue.module';

@Module({
  imports: [UserModule, TaskModule, IssueModule],
})
export class HttpModule {}
