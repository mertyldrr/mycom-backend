import { Injectable } from '@nestjs/common';

@Injectable({})
export class PhotoService {
  getPhotos() {
    return 'Photos fetched';
  }
}
