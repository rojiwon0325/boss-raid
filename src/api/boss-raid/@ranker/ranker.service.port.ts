import { RankerEntity } from './ranker.entity';

export namespace IRankerService {
  export type Ranker = Pick<RankerEntity, 'user_id' | 'score'>;
}

export interface IRankerService {
  readonly save: (args: IRankerService.Ranker) => Promise<void>;
  readonly findMany: () => Promise<IRankerService.Ranker[]>;
}
