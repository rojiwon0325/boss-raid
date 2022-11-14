import { TypeOrmBaseEntity } from '@COMMON/base/base-entity.typeorm';
import { Entity, OneToMany } from 'typeorm';
import { RankerEntity } from '@BOSSRAID/@ranker/ranker.entity';

@Entity({ name: 'users' })
export class UserEntity extends TypeOrmBaseEntity {
  @OneToMany(() => RankerEntity, (ranker: RankerEntity) => ranker.user)
  ranks!: RankerEntity[];
}
