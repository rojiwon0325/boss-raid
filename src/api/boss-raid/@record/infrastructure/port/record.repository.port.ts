import { Record } from '@BOSSRAID/@record/domain';
import { IBaseRepository } from '@COMMON/interface';

export namespace IRecordRepository {
  export type FindOne =
    | Pick<Record.State, 'id'>
    | Pick<Record.State, 'id' | 'user_id'>
    | { readonly limit_seconds: number };

  export type Filter = Pick<Record.State, 'id' | 'user_id'>;
  export type Update = Pick<Record.State, 'status'>;
}
export interface IRecordRepository
  extends IBaseRepository<Record.Id, Record.State> {
  readonly findOne: (
    where: IRecordRepository.FindOne,
  ) => Promise<Record.State | null>;

  readonly update: (
    filter: IRecordRepository.Filter,
    update: IRecordRepository.Update,
  ) => Promise<void>;
}
