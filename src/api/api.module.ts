import { AuthModule } from '@AUTH/auth.module';
import { BossRaidModule } from '@BOSSRAID/boss-raid.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@USER/user.module';

@Module({
  imports: [AuthModule, UserModule, BossRaidModule],
})
export class ApiModule {}
