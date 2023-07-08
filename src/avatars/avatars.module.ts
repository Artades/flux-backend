import { Module } from '@nestjs/common';
import { AvatarsController } from './avatars.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AvatarsController],
})
export class AvatarsModule {}
