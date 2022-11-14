import { IRankerService } from './ranker.service.port';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RankerEntity } from './ranker.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RankerService implements IRankerService {
  constructor(
    @InjectRepository(RankerEntity)
    private readonly repository: Repository<RankerEntity>,
  ) {}

  async save({
    user_id,
    score,
    record_id,
  }: IRankerService.Save): Promise<void> {
    await this.repository.save({ record_id, user_id, score });
    return;
  }

  async findMany(): Promise<IRankerService.Ranker[]> {
    return this.repository
      .createQueryBuilder('rankers')
      .select('SUM(rankers.score) as score')
      .addSelect('rankers.user_id as user_id')
      .groupBy('rankers.user_id')
      .orderBy('score', 'DESC')
      .limit(30)
      .getRawMany<IRankerService.Ranker>();
  }
}
