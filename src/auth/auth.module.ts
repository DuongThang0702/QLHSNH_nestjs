import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Services } from 'src/utils/contants';

@Module({
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
