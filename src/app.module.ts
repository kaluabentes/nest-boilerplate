import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule],
})
export class AppModule {}
