import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Services } from 'src/utils/contants';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
