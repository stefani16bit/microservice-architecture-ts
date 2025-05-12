import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
