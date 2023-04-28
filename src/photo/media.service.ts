import { Injectable } from '@nestjs/common';
import {
  S3Client,
  GetObjectCommand,
  ListObjectsCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
@Injectable({})
export class MediaService {
  s3BucketName = process.env.S3_BUCKET_NAME;
  s3BucketRegion = process.env.S3_BUCKET_REGION;
  accessKey = process.env.AWS_ACCESS_KEY_ID;
  secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  signatureVersion: 'v4';
  s3Client = new S3Client({
    credentials: {
      accessKeyId: this.accessKey,
      secretAccessKey: this.secretAccessKey,
    },
    region: this.s3BucketRegion,
  });
  async getIcons() {
    const listParams = {
      Bucket: this.s3BucketName,
      Delimeter: '/',
      Prefix: 'media/icons/',
    };
    const {
      Name,
      $metadata: response,
      Contents: images,
    } = await this.s3Client.send(new ListObjectsCommand(listParams));
    if (response.httpStatusCode === 200) {
      const imageUrls = [];
      for (const image of images) {
        if (image.Size > 0) {
          const obj = {};
          const signedUrlParams = {
            Bucket: Name,
            Key: image.Key,
          };
          const getObjectCommand = new GetObjectCommand(signedUrlParams);
          const url = await getSignedUrl(this.s3Client, getObjectCommand, {
            expiresIn: 60,
          });
          // Fetch object metadata using headObject command
          const headObjectParams = {
            Bucket: Name,
            Key: image.Key,
          };
          const headObjectCommand = new HeadObjectCommand(headObjectParams);
          const { Metadata: metadata } = await this.s3Client.send(
            headObjectCommand,
          );
          obj['url'] = url;
          obj['href'] = metadata.href;
          imageUrls.push(obj);
        }
      }
      return imageUrls;
    }
  }

  async getPhotos() {
    const listParams = {
      Bucket: this.s3BucketName,
      Delimeter: '/',
      Prefix: 'media/photos/',
    };
    const {
      Name,
      $metadata: response,
      Contents: images,
    } = await this.s3Client.send(new ListObjectsCommand(listParams));
    if (response.httpStatusCode === 200) {
      const imageUrls = [];
      for (const image of images) {
        if (image.Size > 0) {
          const obj = {};
          const signedUrlParams = {
            Bucket: Name,
            Key: image.Key,
          };
          const getObjectCommand = new GetObjectCommand(signedUrlParams);
          const url = await getSignedUrl(this.s3Client, getObjectCommand, {
            expiresIn: 60,
          });
          obj['url'] = url;
          imageUrls.push(obj);
        }
      }
      return imageUrls;
    }
  }
  async getPlangIcons() {
    const listParams = {
      Bucket: this.s3BucketName,
      Delimeter: '/',
      Prefix: 'media/plangicons/',
    };
    const {
      Name,
      $metadata: response,
      Contents: images,
    } = await this.s3Client.send(new ListObjectsCommand(listParams));
    if (response.httpStatusCode === 200) {
      const imageUrls = [];
      for (const image of images) {
        if (image.Size > 0) {
          const obj = {};
          const signedUrlParams = {
            Bucket: Name,
            Key: image.Key,
          };
          const getObjectCommand = new GetObjectCommand(signedUrlParams);
          const url = await getSignedUrl(this.s3Client, getObjectCommand, {
            expiresIn: 60,
          });
          obj['url'] = url;
          imageUrls.push(obj);
        }
      }
      return imageUrls;
    }
  }
}
