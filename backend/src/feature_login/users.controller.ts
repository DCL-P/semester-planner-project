import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Render } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ActivitiesService } from '../feature_user_activities/activities.service.js';
import type { CreateUserDto } from './user.repository.js';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly activitiesService: ActivitiesService
  ) {}

  @Get('/signup')
  @Render('partials/signup')
  template(){

  }

  @HttpCode(HttpStatus.OK)
  @Post('redirect/planner')
  @Render('partials/planner')
  async signIn(@Body() signInDto: Record<string, any>) {
    const user = this.authService.signIn(signInDto.username, signInDto.password);

    const fetchedWeeks = await this.activitiesService.fetchAllWeeks();

    console.log(fetchedWeeks);
    return {
        user,
        fetchedWeeks,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  @Render('index')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

}