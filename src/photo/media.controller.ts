import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MediaService } from './media.service';

@Controller()
export class MediaController {
  constructor(private mediaService: MediaService) {}
  @Get()
  sayHello() {
    return `Hello World`;
  }
  @Get('icons')
  async getIcons(@Req() req: Request, @Res() res: Response) {
    const icons = await this.mediaService.getIcons();
    if (icons) {
      /*
       * res.json eventually calls res.send but also ensures the response will have utf-8 charset and application/json Content-Type
       */
      res.json(icons);
    } else {
      res.status(400).json({ msg: 'Icons are not found' });
    }
  }
  @Get('photos')
  async getPhotos(@Req() req: Request, @Res() res: Response) {
    const photos = await this.mediaService.getPhotos();
    if (photos) {
      /*
       * res.json eventually calls res.send but also ensures the response will have utf-8 charset and application/json Content-Type
       */
      res.json(photos);
    } else {
      res.status(400).json({ msg: 'Icons are not found' });
    }
  }
}
