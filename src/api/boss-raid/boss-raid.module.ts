import { Module } from '@nestjs/common';
import { BossRaidRecordModule } from './@record/record.module';
import { BossRaidDungeonModule } from './@dungeon/dungeon.module';
import { BossRaidUsecase } from './application/adapter/boss-raid.usecase';
import { BossRaidController } from './presentation/web/boss-raid.controller';
import { BossRaidRankUsecase } from './application/adapter/boss-raid.rank.usecase';

@Module({
  imports: [BossRaidDungeonModule, BossRaidRecordModule],
  providers: [BossRaidUsecase, BossRaidRankUsecase],
  controllers: [BossRaidController],
})
export class BossRaidModule {}
