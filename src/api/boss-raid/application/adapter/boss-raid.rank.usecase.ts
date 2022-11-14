import { DungeonService } from '@BOSSRAID/@dungeon/application/adapter/dungeon.service';
import { IDungeonService } from '@BOSSRAID/@dungeon/application/port/dungeon.service.port';
import { RecordService } from '@BOSSRAID/@record/application/adapter/record.service';
import { IRecordService } from '@BOSSRAID/@record/application/port/record.service.port';
import { BossRaid } from '@BOSSRAID/domain';
import { Inject, Injectable } from '@nestjs/common';
import { IBossRaidRankUsecase } from '../port/boss-raid.rank.usecase.port';

@Injectable()
export class BossRaidRankUsecase implements IBossRaidRankUsecase {
  constructor(
    @Inject(DungeonService)
    private readonly dungeonService: IDungeonService,
    @Inject(RecordService)
    private readonly recordService: IRecordService,
  ) {}

  async getRankerList({
    userId,
  }: IBossRaidRankUsecase.GetRank): Promise<IBossRaidRankUsecase.GetRankResponse> {
    const [dungeon, records] = await Promise.all([
      this.dungeonService.findOne(),
      this.recordService.findMany(),
    ]);

    const rankObj = records.reduce<{ [key: number]: number }>(
      (prev, { user_id, level }) => ({
        ...prev,
        [user_id]: prev[user_id] ?? 0 + BossRaid.getScore(dungeon, level),
      }),
      {},
    );

    const topRankerInfoList: IBossRaidRankUsecase.RankingInfo[] =
      Object.entries(rankObj)
        .map(([key, val]) => ({
          userId: +key,
          totalScore: val,
        }))
        .sort((a, b) => b.totalScore - a.totalScore)
        .map<IBossRaidRankUsecase.RankingInfo>(
          ({ userId, totalScore }, ranking) => ({
            ranking,
            userId,
            totalScore,
          }),
        );

    return {
      topRankerInfoList,
      myRankingInfo: topRankerInfoList.find(
        ({ userId: user_id }) => user_id === userId,
      ),
    };
  }
}
