import { Controller, Inject, Post, Body } from '@nestjs/common';
import { IUserService } from 'src/user/interfaces';
import { Routes, Services } from 'src/utils/contants';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.USER_SERVICE) private userService: IUserService,
  ) {}
}
