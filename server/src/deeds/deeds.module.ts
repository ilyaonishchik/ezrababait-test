import { Module } from '@nestjs/common';
import { DeedsController } from './deeds.controller';
import { DeedsService } from './deeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deed } from './models/deed.entity';
import { User } from 'src/users/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deed, User])],
  controllers: [DeedsController],
  providers: [DeedsService],
})
export class DeedsModule {}
