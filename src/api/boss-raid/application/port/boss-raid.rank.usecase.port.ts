export namespace IBossRaidRankUsecase {
  export interface RankingInfo {
    readonly ranking: number;
    readonly userId: number;
    readonly totalScore: number;
  }
  export type GetRank = {
    readonly userId: number;
  };
  export interface GetRankResponse {
    readonly topRankerInfoList: RankingInfo[];
    readonly myRankingInfo?: RankingInfo;
  }
}

export interface IBossRaidRankUsecase {
  readonly getRankerList: (
    args: IBossRaidRankUsecase.GetRank,
  ) => Promise<IBossRaidRankUsecase.GetRankResponse>;
}
