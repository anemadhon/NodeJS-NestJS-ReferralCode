import { Module } from '@nestjs/common';
import { ReferralModule } from './referral/referral.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseSuccessInterceptor } from './response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ReferralModule, UserModule, PrismaModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSuccessInterceptor,
    },
  ],
})
export class AppModule {}
