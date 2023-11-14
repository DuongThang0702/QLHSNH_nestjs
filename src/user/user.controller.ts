import {
  Controller,
  Inject,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import { IUserService } from './interfaces';
import { CreateUserDto, CreaterUserSuccessDto } from './dtos';
import { plainToInstance } from 'class-transformer';
import { UserDocument } from 'src/utils/schema';

@Controller(Routes.USER)
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE) private userService: IUserService,
  ) {}

  @Get()
  async getAllUser() {
    return await this.userService.getAll();
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    const response: UserDocument = await this.userService.create(data);
    return plainToInstance(CreaterUserSuccessDto, response.toObject());
  }

  @Delete(':uid')
  async deleteUser(@Param() param: { uid: string }) {
    return await this.userService.delete(param.uid);
  }
}
