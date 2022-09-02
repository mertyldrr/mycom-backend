import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PhotoService } from './photo.service';

@Controller()
export class PhotoController {
  constructor(private photoService: PhotoService) {}
  @Get('photos')
  async getPhotos(@Req() req: Request, @Res() res: Response) {
    const photos = await this.photoService.getPhotos();
    if (photos) {
      res.send(photos);
    } else {
      res.status(400).send({ msg: 'Photo urls not found' });
    }
  }
}
