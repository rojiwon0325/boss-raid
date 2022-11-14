import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { TypeOrmBaseEntity } from '@COMMON/base';
import { User } from '@USER/domain';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('boss_raid_rankers')
export class RankerEntity extends TypeOrmBaseEntity {
  @Column()
  user_id!: User.Id;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ type: 'int', default: 0 })
  score!: Dungeon.LevelEntity['score'];
}
