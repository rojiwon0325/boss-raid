import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordService } from './application/adapter/record.service';
import { RecordEntity } from './infrastructure/adapter/record.entity';
import { RecordEntityMapper } from './infrastructure/adapter/record.mapper';
import { RecordRepository } from './infrastructure/adapter/record.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  providers: [RecordEntityMapper, RecordRepository, RecordService],
  exports: [RecordService],
})
export class BossRaidRecordModule {}
