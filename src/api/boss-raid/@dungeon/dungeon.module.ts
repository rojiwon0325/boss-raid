import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DungeonService } from './application/adapter/dungeon.service';

@Module({
  imports: [HttpModule],
  providers: [DungeonService],
  exports: [DungeonService],
})
export class BossRaidDungeonModule {}
