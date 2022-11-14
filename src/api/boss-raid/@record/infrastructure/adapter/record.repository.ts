import { Record } from '@BOSSRAID/@record/domain';
import { BossRaid } from '@BOSSRAID/domain';
import { TypeOrmBaseRepository } from '@COMMON/base';
import { IEntityMapper } from '@COMMON/interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';
import { IRecordRepository } from '../port/record.repository.port';
import { RecordEntity } from './record.entity';
import { RecordEntityMapper } from './record.mapper';

@Injectable()
export class RecordRepository
  extends TypeOrmBaseRepository<Record.State, RecordEntity>
  implements IRecordRepository
{
  constructor(
    @Inject(RecordEntityMapper)
    mapper: IEntityMapper<Record.State, RecordEntity>,
    @InjectRepository(RecordEntity)
    repository: Repository<RecordEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne(
    where: IRecordRepository.FindOne,
  ): Promise<Record.State | null> {
    let option: FindOptionsWhere<RecordEntity> = {};
    if ('limit_seconds' in where) {
      const limit = BossRaid.getTimeLimit({
        limit_seconds: where.limit_seconds,
      });
      option = { created_at: MoreThanOrEqual(limit), status: 'Playing' };
    } else if ('user_id' in where) {
      option = { id: where.id, user_id: where.user_id, status: 'Playing' };
    } else {
      option = { id: where.id, status: 'Playing' };
    }
    const entity = await this.getRepository().findOne({ where: option });
    return entity == null ? null : this.getMapper().toAggregate(entity);
  }

  async findMany(): Promise<Record.State[]> {
    return (
      await this.getRepository().find({ where: { status: 'GameClear' } })
    ).map(this.getMapper().toAggregate);
  }

  async update(
    { id, user_id }: IRecordRepository.Filter,
    { status }: IRecordRepository.Update,
  ): Promise<void> {
    await this.getRepository().update({ id, user_id }, { status });
    return;
  }
}
