import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from 'src/entities/upload-file.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UploadFile)
    private readonly uploadFileRepository: Repository<UploadFile>,
  ) {}
  async create(fileBuffer: Express.Multer.File) {
    console.log({ fileBuffer });
    try {
      const s3Client = new S3Client({
        region: this.configService.get('aws.region'),
        credentials: {
          accessKeyId: this.configService.get('aws.accessKeyId'),
          secretAccessKey: this.configService.get('aws.secretAccessKey'),
        },
      });
      const params = {
        Bucket: this.configService.get('aws.s3.bucketName'),
        Key: `${uuidv4()}`,
        Body: fileBuffer.buffer,
      };

      const uploadResponse = await s3Client.send(new PutObjectCommand(params));
      console.log(
        'Successfully created ' +
          params.Key +
          ' and uploaded it to ' +
          params.Bucket +
          '/' +
          params.Key,
      );
      console.log(uploadResponse);
      return 'Success';

      //   await this.uploadFileRepository.insert({
      //     fileKey: uploadResponse.,
      //     fileUrl: uploadResponse.Location,
      //   });

      //   return { fileUrl: uploadResponse.Location };
    } catch (error) {
      console.log(console.error);

      throw new Error('something went wrong');
    }
  }
}
