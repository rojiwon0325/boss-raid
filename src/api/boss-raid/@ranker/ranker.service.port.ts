import { RankerEntity } from './ranker.entity';

export namespace IRankerService {
  export type Save = Pick<RankerEntity, 'record_id' | 'user_id' | 'score'>;
  export type Ranker = Pick<RankerEntity, 'user_id' | 'score'>;
}

export interface IRankerService {
  readonly save: (args: IRankerService.Save) => Promise<void>;
  readonly findMany: () => Promise<IRankerService.Ranker[]>;
}
