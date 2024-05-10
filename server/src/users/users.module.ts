import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Deed } from 'src/deeds/models/deed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Deed])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
