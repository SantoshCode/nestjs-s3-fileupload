import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('fileBuffer'))
  async create(@UploadedFile() fileBuffer: Express.Multer.File) {
    return await this.fileService.uploadFile(fileBuffer);
  }
}
