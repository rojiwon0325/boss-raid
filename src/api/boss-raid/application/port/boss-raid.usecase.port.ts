import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { Record } from '@BOSSRAID/@record/domain';
import { User } from '@USER/domain';

export namespace IBossRaidUsecase {
  export type GetStateResponse =
    | {
        /**
         * 던전 입장 가능 여부
         */
        readonly canEnter: true;
      }
    | {
        /**
         * 던전 입장 가능 여부
         */
        readonly canEnter: false;

        /**
         * 현재 진행중인 유저
         */
        readonly enteredUserId: User.Id;
      };

  export interface Enter {
    readonly userId: User.Id;
    readonly level: Dungeon.LevelEntity['level'];
  }

  export type EnterResponse =
    | {
        /**
         * 입장 성공 여부
         */
        readonly isEntered: false;
      }
    | {
        /**
         * 입장 성공 여부
         */
        readonly isEntered: true;
        /**
         * 생성된 레코드 id
         */
        readonly raidRecordId: Record.Id;
      };

  export interface End {
    readonly userId: User.Id;
    readonly raidRecordId: Record.Id;
  }
}
export interface IBossRaidUsecase {
  readonly getState: () => Promise<IBossRaidUsecase.GetStateResponse>;
  readonly enter: (
    args: IBossRaidUsecase.Enter,
  ) => Promise<IBossRaidUsecase.EnterResponse>;
  readonly end: (args: IBossRaidUsecase.End) => Promise<void>;
}
