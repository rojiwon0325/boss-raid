import { Public } from '@AUTH/provider/decorator';
import { BossRaidRankUsecase } from '@BOSSRAID/application/adapter/boss-raid.rank.usecase';
import { BossRaidUsecase } from '@BOSSRAID/application/adapter/boss-raid.usecase';
import { IBossRaidRankUsecase } from '@BOSSRAID/application/port/boss-raid.rank.usecase.port';
import { IBossRaidUsecase } from '@BOSSRAID/application/port/boss-raid.usecase.port';
import { Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import helper from 'nestia-helper';

@Public()
@Controller('bossRaid')
export class BossRaidController {
  constructor(
    @Inject(BossRaidUsecase)
    private readonly bossRaidUsecase: IBossRaidUsecase,
    @Inject(BossRaidRankUsecase)
    private readonly bossRaidRankUsecase: IBossRaidRankUsecase,
  ) {}

  /**
   * 보스 레이드 상태 조회
   * @returns 보스 레이드 상태 조회 결과
   */
  @Get()
  getState() {
    return this.bossRaidUsecase.getState();
  }

  /**
   * 랭커 리스트를 얻는다.
   * @param body myrank로 확인할 유저의 Id
   * @returns
   */
  @Get('topRankerList')
  getRankerList(@helper.TypedBody() body: IBossRaidRankUsecase.GetRank) {
    const { userId } = body;
    return this.bossRaidRankUsecase.getRankerList({ userId });
  }

  /**
   * 보스 레이드 시작
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
   * @param body 종료할 유저 및 레코드 정보
   * @returns 없음
   */
  @Patch('end')
  end(@helper.TypedBody() body: IBossRaidUsecase.End) {
    const { userId, raidRecordId } = body;
    return this.bossRaidUsecase.end({ userId, raidRecordId });
  }
}
