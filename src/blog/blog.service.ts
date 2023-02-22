import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly fileUploadService: FileService,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    try {
      let newContent = '';

      const contentArr = createBlogDto.content.split(/<img src=(.*?)>/);
      console.log({ contentArr });

      // let's run our promise in series
      for (const item of contentArr) {
        if (item.startsWith('"data:image/')) {
          // handle image
          const base64Data = item.split(',')[1];
          const url = await this._base64ToUrl(base64Data);
          newContent += `<img src="${url}" />`;
        } else {
          newContent += item;
        }
      }

      await this.blogRepository.insert({
        content: newContent,
      });
      console.log({ newContent });

      return { message: 'success', newContent };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  private async _base64ToUrl(base64Data: string) {
    const buffer = Buffer.from(base64Data, 'base64');

    const url = await this.fileUploadService.uploadBuffer(buffer);

    // console.log(buffer);
    return url;
  }

  findAll() {
    return '';
  }
}
