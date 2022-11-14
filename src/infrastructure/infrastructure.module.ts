import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from './DB/typeorm.module';
import { AllExceptionFilter } from './filter/all-exception.filter';

@Module({
  imports: [ConfigModule, TypeOrmModule, CacheModule],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionFilter }],
})
export class InfrastructureModule {
  constructor(readonly dataSource: DataSource) {}
}
