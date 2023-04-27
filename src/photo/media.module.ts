import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { mediaService } from './media.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MediaController],
  providers: [mediaService],
})
export class MediaModule {}
