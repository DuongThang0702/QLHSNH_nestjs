import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.product'],
    }),
    MongooseModule.forRoot(process.env.URL_CONNECT_DATABASE as string),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
