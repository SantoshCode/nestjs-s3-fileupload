import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  findAll() {
    return '';
  }
}
