import { Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index(){
    return {
      name: 'Runix'
    }
  }

  @Post()
  confirm(){
    return {message: "hello front-end :D"};
  }
}
