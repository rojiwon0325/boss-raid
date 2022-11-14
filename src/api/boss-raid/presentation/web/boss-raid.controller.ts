import { BossRaidUsecase } from '@BOSSRAID/application/adapter/boss-raid.usecase';
import { IBossRaidUsecase } from '@BOSSRAID/application/port/boss-raid.usecase.port';
import { Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import helper from 'nestia-helper';

@Controller('bossRaid')
export class BossRaidController {
  constructor(
    @Inject(BossRaidUsecase)
    private readonly bossRaidUsecase: IBossRaidUsecase,
  ) {}

  /**
   * 보스 레이드 상태 조회
   * @tag boss-raid
   * @returns 보스 레이드 상태 조회 결과
   */
  @Get()
  getState() {
    return this.bossRaidUsecase.getState();
  }

  /**
   * 랭커 리스트를 얻는다.
   * @tag boss-raid
   * @param body myrank로 확인할 유저의 Id
   * @returns
   */
  @Get('topRankerList')
  getRankerList(@helper.TypedBody() body: IBossRaidUsecase.GetRank) {
    const { userId } = body;
    return this.bossRaidUsecase.getRankers({ userId });
  }

  /**
   * 보스 레이드 시작
   * @tag boss-raid
   * @param body 입장 유저 정보 및 레벨 정보
   * @returns 레이드 시작 정보
   */
  @Post('enter')
  enter(@helper.TypedBody() body: IBossRaidUsecase.Enter) {
    const { userId, level } = body;
    return this.bossRaidUsecase.enter({ userId, level });
  }

  /**
   * 보스 레이드 종료
   * @tag boss-raid
   * @param body 종료할 유저 및 레코드 정보
   * @returns 없음
   */
  @Patch('end')
  end(@helper.TypedBody() body: IBossRaidUsecase.End) {
    const { userId, raidRecordId } = body;
    return this.bossRaidUsecase.end({ userId, raidRecordId });
  }
}
