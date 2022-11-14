import { CacheModule as OriginalModule, Module } from '@nestjs/common';

@Module({
  imports: [OriginalModule.register({ isGlobal: true, ttl: 300000, max: 100 })],
})
export class CacheModule {}
