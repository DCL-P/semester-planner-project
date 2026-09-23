import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Render, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ActivitiesService } from '../feature_user_activities/activities.service.js';
import type { CreateUserDto } from './user.repository.js';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly activitiesService: ActivitiesService
  ) {}

  @Get('/auth/signup')
  @Render('partials/signup')
  signUpPage() {
    return {};
  }

  @HttpCode(HttpStatus.OK)
  @Post('/auth/signin')
  async signIn(@Body() signInDto: Record<string, any>) {
    const user = await this.authService.signIn(
        signInDto.username,
        signInDto.password
    );

    return {
        user
    };
  } 

  @HttpCode(HttpStatus.OK)
  @Post('/auth/signup')
  @Render('index')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

}