import { BossRaid } from '@BOSSRAID/domain';
import { IDungeonService } from '@BOSSRAID/@dungeon/application/port/dungeon.service.port';
import { IRecordService } from '@BOSSRAID/@record/application/port/record.service.port';
import { HttpExceptionFactory } from '@COMMON/exception';
import { Inject, Injectable } from '@nestjs/common';
import { IBossRaidUsecase } from '../port/boss-raid.usecase.port';
import { DungeonService } from '@BOSSRAID/@dungeon/application/adapter/dungeon.service';
import { RecordService } from '@BOSSRAID/@record/application/adapter/record.service';
import { IRankerService } from '@BOSSRAID/@ranker/ranker.service.port';
import { RankerService } from '@BOSSRAID/@ranker/ranker.service';

@Injectable()
export class BossRaidUsecase implements IBossRaidUsecase {
  constructor(
    @Inject(DungeonService)
    private readonly dungeonService: IDungeonService,
    @Inject(RecordService)
    private readonly recordService: IRecordService,
    @Inject(RankerService)
    private readonly rankerService: IRankerService,
  ) {}

  async getState(): Promise<IBossRaidUsecase.GetStateResponse> {
    const { limit_seconds } = await this.dungeonService.findOne();
    return this.recordService.getState({ limit_seconds });
  }

  async getRankers({
    userId,
  }: IBossRaidUsecase.GetRank): Promise<IBossRaidUsecase.GetRankResponse> {
    const rankers = (
      await this.rankerService.findMany()
    ).map<IBossRaidUsecase.RankingInfo>((ranker, idx) => ({
      ranking: idx,
      userId: ranker.user_id,
      totalScore: ranker.score,
    }));
    return {
      topRankerInfoList: rankers,
      myRankingInfo: rankers.find((info) => info.userId === userId),
    };
  }

  async enter({
    userId,
    level,
  }: IBossRaidUsecase.Enter): Promise<IBossRaidUsecase.EnterResponse> {
    const { canEnter } = await this.getState();

    if (!canEnter) {
      return { isEntered: false };
    }
    const record = await this.recordService.create({ user_id: userId, level });
    return { isEntered: true, raidRecordId: record.id };
  }

  async end({ userId, raidRecordId }: IBossRaidUsecase.End): Promise<void> {
    const [dungeon, record] = await Promise.all([
      this.dungeonService.findOne(),
      this.recordService.findOne({
        id: raidRecordId,
        user_id: userId,
      }),
    ]);

    const GAME_CLEAR = BossRaid.checkTimeLimit(dungeon, record);
    await this.recordService.endGame({
      id: raidRecordId,
      user_id: userId,
      status: GAME_CLEAR ? 'GameClear' : 'GameOver',
    });

    if (GAME_CLEAR) {
      const score = BossRaid.getScore(dungeon, record.level);
      await this.rankerService.save({ user_id: userId, score });
    } else {
      throw HttpExceptionFactory(
        'BadRequest',
        '레이드 제한 시간을 초과했습니다.',
      );
    }
    return;
  }
}
