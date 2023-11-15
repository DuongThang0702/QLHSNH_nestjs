import { Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(8)
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  role: string;
  @IsNotEmpty()
  fullname: string;
}

export class CreaterUserSuccessDto {
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  _id: string;
}
