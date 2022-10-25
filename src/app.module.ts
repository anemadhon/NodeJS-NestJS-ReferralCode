import { Module } from '@nestjs/common';
import { ReferralModule } from './referral/referral.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseSuccessInterceptor } from './response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ResponseErrorExceptionFilter } from './response.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReferralModule,
    UserModule,
    PrismaModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: ResponseErrorExceptionFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSuccessInterceptor,
    },
  ],
})
export class AppModule {}
