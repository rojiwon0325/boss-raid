import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { Record } from '@BOSSRAID/@record/domain';

export interface BossRaid {
  readonly getScore: (
    agg: Dungeon.State,
    level: Dungeon.LevelEntity['level'],
  ) => Dungeon.LevelEntity['score'];
  readonly checkTimeLimit: (
    dungeon: Dungeon.State,
    record: Record.State,
  ) => boolean;
}

export const BossRaid: BossRaid = {
  getScore(dungeon, targetLevel) {
    return (
      dungeon.levels.find(({ level }) => level === targetLevel)?.score ?? 0
    );
  },
  checkTimeLimit(dungeon, record) {
    const limit = new Date(Date.now() - dungeon.limit_seconds * 1000);
    return record.created_at >= limit;
  },
};
