import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from '../contants';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  collection: 'User',
})
export class User {
  @Prop({ unique: true, min: 8 })
  email: string;

  @Prop({ min: 6 })
  password: string;

  @Prop()
  fullname: string;

  @Prop({ default: '' })
  refresh_token: string;

  @Prop({
    type: String,
    required: true,
    enum: Roles,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
