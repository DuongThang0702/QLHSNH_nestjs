import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { IUserService } from 'src/user/interfaces';
import { Services } from 'src/utils/contants';
import { IAuthService } from './interfaces';
import { LoginDetail } from './types';
import { UserDocument } from 'src/utils/schema';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(Services.USER_SERVICE) private userService: IUserService,
  ) {}

  async login(data: LoginDetail): Promise<{ access_token: string }> {
    const user = await this.userService.getOneBy({ email: data.email });
    if (user.password !== data.password)
      throw new HttpException(
        'wrong password or email',
        HttpStatus.BAD_REQUEST,
      );
    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user.email);
    await user.updateOne({ refresh_token });
    return {
      access_token,
    };
  }

  async generateAccessToken(user: UserDocument): Promise<string> {
    const access_token = await this.jwtService.signAsync(
      { email: user.email, _id: user._id, role: user.role },
      {
        secret: process.env.ACCESS_TOKEN,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
      },
    );
    return access_token;
  }

  async generateRefreshToken(email: string): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { email },
      {
        secret: process.env.REFRESH_TOKEN,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
      },
    );
    return refreshToken;
  }
}
