import { BossRaid } from '@BOSSRAID/domain';
import { IDungeonService } from '@BOSSRAID/@dungeon/application/port/dungeon.service.port';
import { IRecordService } from '@BOSSRAID/@record/application/port/record.service.port';
import { HttpExceptionFactory } from '@COMMON/exception';
import { Inject, Injectable } from '@nestjs/common';
import { IBossRaidUsecase } from '../port/boss-raid.usecase.port';
import { DungeonService } from '@BOSSRAID/@dungeon/application/adapter/dungeon.service';
import { RecordService } from '@BOSSRAID/@record/application/adapter/record.service';

@Injectable()
export class BossRaidUsecase implements IBossRaidUsecase {
  constructor(
    @Inject(DungeonService)
    private readonly dungeonService: IDungeonService,
    @Inject(RecordService)
    private readonly recordService: IRecordService,
  ) {}

  async getState(): Promise<IBossRaidUsecase.GetStateResponse> {
    const { limit_seconds } = await this.dungeonService.findOne();
    return this.recordService.getState({ limit_seconds });
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
      console.log(score, userId); // 랭킹 시스템 도입
    } else {
      throw HttpExceptionFactory(
        'BadRequest',
        '레이드 제한 시간을 초과했습니다.',
      );
    }
    return;
  }
}
