import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { IBaseAggregate } from '@COMMON/interface';
import { User } from '@USER/domain';

export namespace Record {
  export type Id = number;
  export type Status = 'Playing' | 'GameOver' | 'GameClear';
  export interface State extends IBaseAggregate<Id> {
    readonly user_id: User.Id;
    readonly level: Dungeon.LevelEntity['level'];
    readonly status: Status;
  }
}

type Required = keyof Pick<Record.State, 'level' | 'user_id'>;

export interface Record {
  readonly get: (
    props: Pick<Record.State, Required> & Partial<Omit<Record.State, Required>>,
  ) => Record.State;
  readonly setStatus: (
    agg: Record.State,
    update: Pick<Record.State, 'status'>,
  ) => void;
}

export const Record: Record = {
  get(props) {
    const now = new Date();
    const {
      level,
      user_id,
      status = 'Playing',
      id = 0,
      created_at = now,
      updated_at = now,
    } = props;
    return { id, created_at, updated_at, user_id, level, status };
  },

  setStatus(agg, { status }) {
    (agg as any).status = status;
    return;
  },
};
