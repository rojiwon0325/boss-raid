import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { HttpExceptionFactory } from '@COMMON/exception';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { catchError, firstValueFrom, map } from 'rxjs';
import TSON from 'typescript-json';
import { IDungeonService } from '../port/dungeon.service.port';

@Injectable()
export class DungeonService implements IDungeonService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER)
    private readonly cahceManager: Cache,
  ) {}
  async findOne(): Promise<Dungeon.State> {
    const dungeon = await this.cahceManager.get<Dungeon.State>('dungeon');
    if (dungeon == null) {
      const data = await firstValueFrom(
        this.httpService
          .get<IDungeonService.BossRaidStaticData>(
            'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
          )
          .pipe(
            catchError(() => {
              throw HttpExceptionFactory(
                'NotFound',
                '던전이 준비되지 않았습니다.',
              );
            }),
            map(({ data }) => {
              const { bossRaids } = TSON.assert(data);
              const { bossRaidLimitSeconds, levels } = bossRaids[0];
              return Dungeon.get({
                levels,
                limit_seconds: bossRaidLimitSeconds,
              });
            }),
          ),
      );
      await this.cahceManager.set('dungeon', data, 0);
      return data;
    }
    return dungeon;
  }
}
