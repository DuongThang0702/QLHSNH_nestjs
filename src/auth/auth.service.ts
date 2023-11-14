import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(
    email: string,
    _id: Types.ObjectId,
    lastname: string,
    firstname: string,
  ): Promise<string> {
    const access_token = await this.jwtService.signAsync(
      { email, _id, lastname, firstname },
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
