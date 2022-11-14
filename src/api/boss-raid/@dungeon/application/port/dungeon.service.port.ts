import { Dungeon } from '@BOSSRAID/@dungeon/domain';

export namespace IDungeonService {
  type Level = { level: number; score: number };
  type BossRaid = {
    bossRaidLimitSeconds: number;
    levels: Level[];
  };
  export type BossRaidStaticData = {
    bossRaids: BossRaid[];
  };
}
export interface IDungeonService {
  readonly findOne: () => Promise<Dungeon.State>;
}
