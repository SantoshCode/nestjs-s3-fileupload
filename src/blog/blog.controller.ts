import { Controller, Get, Post, Body } from '@nestjs/common';
// import * as sanitize from 'sanitize-html';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    // lets not use sanitize for now
    // createBlogDto.content = sanitize(createBlogDto.content, {
    //   allowedTags: ['img'],
    // });
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }
}
