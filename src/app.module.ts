import { Module } from '@nestjs/common';
import { ReferralModule } from './referral/referral.module';

@Module({
  imports: [ReferralModule],
})
export class AppModule {}
