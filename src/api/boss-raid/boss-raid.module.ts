import { Module } from '@nestjs/common';
import { BossRaidRecordModule } from './@record/record.module';
import { BossRaidDungeonModule } from './@dungeon/dungeon.module';
import { BossRaidUsecase } from './application/adapter/boss-raid.usecase';
import { BossRaidController } from './presentation/web/boss-raid.controller';
import { RankerModule } from './@ranker/ranker.module';

@Module({
  imports: [BossRaidDungeonModule, BossRaidRecordModule, RankerModule],
  providers: [BossRaidUsecase],
  controllers: [BossRaidController],
})
export class BossRaidModule {}
