import { Dungeon } from '@BOSSRAID/@dungeon/domain';

export namespace IDungeonService {}
export interface IDungeonService {
  readonly findOne: () => Promise<Dungeon.State>;
}
