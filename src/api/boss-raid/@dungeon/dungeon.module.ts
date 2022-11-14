import { Module } from '@nestjs/common';
import { DungeonService } from './application/adapter/dungeon.service';

@Module({
  providers: [DungeonService],
  exports: [DungeonService],
})
export class BossRaidDungeonModule {}
