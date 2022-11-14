import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { UserEntity } from './user.entity';

@Injectable()
export class UserEntityMapper implements IEntityMapper<User.State, UserEntity> {
  toAggregate(entity: UserEntity): User.State {
    const { ranks, id, created_at, updated_at } = entity;
    return User.get({
      id,
      created_at,
      updated_at,
      boss_raid_history: ranks.map((rank) => ({
        id: rank.record_id,
        enter_time: rank.record.created_at,
        end_time: rank.record.updated_at,
        score: rank.score,
      })),
      total_score: ranks.reduce((a, b) => a + b.score, 0),
    });
  }
  toRootEntity(aggregate: User.State): UserEntity {
    const { id } = aggregate;
    const entity = new UserEntity();
    if (id) entity.id = id;
    return entity;
  }
}
