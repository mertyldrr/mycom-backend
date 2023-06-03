import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MediaModule } from './mycom/media/media.module';
import { AuthModule } from './reddit/auth/auth.module';
import { UserModule } from './reddit/user/user.module';
import { NewsModule } from './win11/news/news.module';

@Module({
  imports: [
    MediaModule,
    NewsModule,
    AuthModule,
    UserModule,
    ThrottlerModule.forRoot({ ttl: 86400, limit: 1000 }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
