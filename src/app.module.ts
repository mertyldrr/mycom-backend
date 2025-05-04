import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MediaModule } from './mycom/media/media.module';
import { NewsModule } from './win11/news/news.module';

@Module({
  imports: [
    MediaModule,
    NewsModule,
    ThrottlerModule.forRoot({ ttl: 86400, limit: 1000 }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
