import { Controller, Inject, Post, Body } from '@nestjs/common';
import { IUserService } from 'src/user/interfaces';
import { Routes, Services } from 'src/utils/contants';
import { IAuthService } from './interfaces';
import { LoginDto, LoginSuccessDto } from './dtos';
import { plainToInstance } from 'class-transformer';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH_SERVICE) private authService: IAuthService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const response = await this.authService.login(data);
    return plainToInstance(LoginSuccessDto, response, {
      excludeExtraneousValues: true,
    });
  }
}
