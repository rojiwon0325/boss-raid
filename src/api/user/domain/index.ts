import { Record } from '@BOSSRAID/@record/domain';
import { IBaseAggregate } from '@COMMON/interface/base-aggregate.interface';

export namespace User {
  export type Id = number;

  export type HistoryEntity = {
    id: Record.Id;
    score: number;
    enter_time: Date;
    end_time: Date;
  };

  export interface State extends IBaseAggregate<Id> {
    total_score: number;
    boss_raid_history: HistoryEntity[];
  }
}

export interface User {
  readonly get: (
    props: Pick<User.State, 'boss_raid_history'> &
      Partial<Omit<User.State, 'boss_raid_history'>>,
  ) => User.State;
}

export const User: User = {
  get(props) {
    const now = new Date();
    const {
      boss_raid_history,
      id = 0,
      created_at = now,
      updated_at = now,
      total_score = boss_raid_history.reduce((a, b) => a + b.score, 0),
    } = props;
    return { id, created_at, updated_at, total_score, boss_raid_history };
  },
};
