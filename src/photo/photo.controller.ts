import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller()
export class PhotoController {
  constructor(private photoService: PhotoService) {}
  @Get('photos')
  getPhotos() {
    return this.photoService.getPhotos();
  }
}
