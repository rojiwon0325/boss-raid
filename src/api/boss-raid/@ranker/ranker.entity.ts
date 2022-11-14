import { Dungeon } from '@BOSSRAID/@dungeon/domain';
import { Record } from '@BOSSRAID/@record/domain';
import { RecordEntity } from '@BOSSRAID/@record/infrastructure/adapter/record.entity';
import { TypeOrmBaseEntity } from '@COMMON/base';
import { User } from '@USER/domain';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('boss_raid_rankers')
export class RankerEntity extends TypeOrmBaseEntity {
  @Column()
  user_id!: User.Id;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.ranks)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ type: 'int', default: 0 })
  score!: Dungeon.LevelEntity['score'];

  @Column()
  record_id!: Record.Id;

  @OneToOne(() => RecordEntity)
  @JoinColumn({ name: 'record_id' })
  record!: RecordEntity;
}
