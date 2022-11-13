import { Record } from '@BOSSRAID/@record/domain';
import { TypeOrmBaseEntity } from '@COMMON/base';
import { UserEntity } from '@USER/infrastructure/adapter/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('boss_raid_records')
export class RecordEntity extends TypeOrmBaseEntity {
  @Column()
  user_id!: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ type: 'int' })
  level!: Record.State['level'];

  @Column({ default: 'Playing' })
  status!: Record.Status;
}
