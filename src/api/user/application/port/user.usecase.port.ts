import { User } from '@USER/domain';

export namespace IUserUsecase {
  export type FindOne = Pick<User.State, 'id'>;
  export type History = {
    readonly raidRecordId: number;
    readonly score: number;
    readonly enterTime: string;
    readonly endTime: string;
  };
  export interface FindOneResponse {
    readonly totalScore: number;
    readonly bossRaidHistory: History[];
  }
  export interface CreateResponse {
    readonly userId: number;
  }
}

export interface IUserUsecase {
  readonly findOne: (
    where: IUserUsecase.FindOne,
  ) => Promise<IUserUsecase.FindOneResponse>;
  readonly create: () => Promise<IUserUsecase.CreateResponse>;
}
