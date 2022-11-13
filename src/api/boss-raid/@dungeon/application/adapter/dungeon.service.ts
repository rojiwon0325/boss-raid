import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { Injectable } from '@nestjs/common';
import { IDungeonService } from '../port/dungeon.service.port';

@Injectable()
export class DungeonService implements IDungeonService {
  async findOne(): Promise<Dungeon.State> {
    return Dungeon.get();
  }
}
