import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}
  async uploadFile(publicFile: Express.Multer.File) {
    return await this.uploadBuffer(publicFile.buffer);
  }

  async uploadBuffer(fileBuffer: Buffer) {
    try {
      const s3Client = new S3Client({
        region: this.configService.get('aws.region'),
        credentials: {
          accessKeyId: this.configService.get('aws.accessKeyId'),
          secretAccessKey: this.configService.get('aws.secretAccessKey'),
        },
      });
      const photoKey = `${uuidv4()}`;
      const params = {
        Bucket: this.configService.get('aws.s3.bucketName'),
        Key: photoKey,
        Body: fileBuffer,
      };

      await s3Client.send(new PutObjectCommand(params));

      const href = `https:/s3.${this.configService.get(
        'aws.region',
      )}.amazonaws.com/`;

      const bucketUrl = new URL(
        href + this.configService.get('aws.s3.bucketName') + '/',
      );

      const imageUrl = bucketUrl + encodeURIComponent(photoKey);

      return imageUrl;
    } catch (error) {
      console.log(console.error);

      throw new Error('something went wrong');
    }
  }
}
