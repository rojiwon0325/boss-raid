import { BossRaidModule } from '@BOSSRAID/boss-raid.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@USER/user.module';

@Module({
  imports: [UserModule, BossRaidModule],
})
export class ApiModule {}
