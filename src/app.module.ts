import { Module } from '@nestjs/common';
import { ReferralModule } from './referral/referral.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ReferralModule, UserModule],
})
export class AppModule {}
