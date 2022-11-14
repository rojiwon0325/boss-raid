import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { Record } from '@BOSSRAID/@record/domain';

export namespace IRecordService {
  export type GetState = {
    /**
     * 던전 제한 시간
     */
    readonly limit_seconds: Dungeon.State['limit_seconds'];
  };

  export type GetStateResponse =
    | {
        readonly canEnter: false;
        readonly enteredUserId: Record.State['user_id'];
      }
    | { readonly canEnter: true };

  export type FindOne = Pick<Record.State, 'id' | 'user_id'>;

  export type Create = Pick<Record.State, 'user_id' | 'level'>;

  export type EndGame = Pick<Record.State, 'id' | 'user_id' | 'status'>;
}
export interface IRecordService {
  readonly getState: (
    args: IRecordService.GetState,
  ) => Promise<IRecordService.GetStateResponse>;
  readonly findOne: (args: IRecordService.FindOne) => Promise<Record.State>;
  readonly findMany: () => Promise<Record.State[]>;
  readonly create: (args: IRecordService.Create) => Promise<Record.State>;
  readonly endGame: (args: IRecordService.EndGame) => Promise<void>;
}
