import { Module } from '@nestjs/common';
import { MediaModule } from './photo/media.module';

@Module({
  imports: [MediaModule],
})
export class AppModule {}
