import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { Record } from '@BOSSRAID/@record/domain';

export interface BossRaid {
  readonly getScore: (
    agg: Dungeon.State,
    level: Dungeon.LevelEntity['level'],
  ) => Dungeon.LevelEntity['score'];
  readonly getTimeLimit: (args: Pick<Dungeon.State, 'limit_seconds'>) => Date;
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
  getTimeLimit({ limit_seconds }) {
    return new Date(Date.now() - limit_seconds * 1000);
  },
  checkTimeLimit({ limit_seconds }, { created_at }) {
    const limit = this.getTimeLimit({ limit_seconds });
    return created_at >= limit;
  },
};
