import { Module } from '@nestjs/common';
import { ReferralModule } from './referral/referral.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ReferralModule, UserModule, PrismaModule],
})
export class AppModule {}
