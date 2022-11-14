import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankerEntity } from './ranker.entity';
import { RankerService } from './ranker.service';

@Module({
  imports: [TypeOrmModule.forFeature([RankerEntity])],
  providers: [RankerService],
  exports: [RankerService],
})
export class RankerModule {}
