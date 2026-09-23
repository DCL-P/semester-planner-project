import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Render } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { CreateUserDto } from './user.repository.js';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get('/auth/signup')
  @Render('partials/signup')
  signUpPage() {
    return {};
  }

  @HttpCode(HttpStatus.OK)
  @Post('redirect/planner')
  @Render('partials/planner')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('/auth/signup')
  @Render('index')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

}