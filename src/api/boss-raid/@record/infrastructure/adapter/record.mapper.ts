import { Record } from '@BOSSRAID/@record/domain';
import { IEntityMapper } from '@COMMON/interface';
import { Injectable } from '@nestjs/common';
import { RecordEntity } from './record.entity';

@Injectable()
export class RecordEntityMapper
  implements IEntityMapper<Record.State, RecordEntity>
{
  toAggregate(entity: RecordEntity): Record.State {
    const { level, user_id, status, id, created_at, updated_at } = entity;
    return Record.get({ level, user_id, status, id, created_at, updated_at });
  }
  toRootEntity(aggregate: Record.State): RecordEntity {
    const { id, user_id, status, level } = aggregate;
    const entity = new RecordEntity();
    if (id) entity.id = id;
    entity.level = level;
    entity.status = status;
    entity.user_id = user_id;
    return entity;
  }
}
