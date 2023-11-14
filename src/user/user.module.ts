import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Services } from 'src/utils/contants';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/utils/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
