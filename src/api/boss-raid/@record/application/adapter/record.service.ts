import { Record } from '@BOSSRAID/@record/domain';
import { RecordRepository } from '@BOSSRAID/@record/infrastructure/adapter/record.repository';
import { IRecordRepository } from '@BOSSRAID/@record/infrastructure/port/record.repository.port';
import { HttpExceptionFactory } from '@COMMON/exception';
import { throw_if_null } from '@COMMON/util';
import { Inject, Injectable } from '@nestjs/common';
import { IRecordService } from '../port/record.service.port';

@Injectable()
export class RecordService implements IRecordService {
  constructor(
    @Inject(RecordRepository)
    private readonly recordRepository: IRecordRepository,
  ) {}

  async getState({
    limit_seconds,
  }: IRecordService.GetState): Promise<IRecordService.GetStateResponse> {
    const record = await this.recordRepository.findOne({ limit_seconds });
    return record
      ? { canEnter: false, enteredUserId: record.user_id }
      : { canEnter: true };
  }

  async findOne({
    id,
    user_id,
  }: IRecordService.FindOne): Promise<Record.State> {
    return throw_if_null(
      await this.recordRepository.findOne({ id, user_id }),
      HttpExceptionFactory('NotFound'),
    );
  }

  findMany(): Promise<Record.State[]> {
    return this.recordRepository.findMany();
  }
  async create({
    level,
    user_id,
  }: IRecordService.Create): Promise<Record.State> {
    return this.recordRepository.save(
      Record.get({ user_id, level, status: 'Playing' }),
    );
  }
  async endGame({
    id,
    user_id,
    status,
  }: IRecordService.EndGame): Promise<void> {
    return this.recordRepository.update({ id, user_id }, { status });
  }
}
