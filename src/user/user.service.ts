import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUserService } from './interfaces';
import { Document, Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/utils/schema';
import { InjectModel } from '@nestjs/mongoose';
import { TCreateUser } from './type';
@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(data: TCreateUser): Promise<UserDocument> {
    const matchEmail = await this.userModel.findOne({ email: data.email });
    if (matchEmail)
      throw new HttpException(
        'email has already existed',
        HttpStatus.BAD_REQUEST,
      );
    const newUser = new this.userModel({ ...data });
    const response: UserDocument = await newUser.save();
    if (response === null)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    else return response;
  }
  async getAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }
  async getOneBy(uid: string): Promise<UserDocument> {
    const validateUid = Types.ObjectId.isValid(uid);
    if (!validateUid)
      throw new HttpException('invalid uid', HttpStatus.BAD_REQUEST);
    return await this.userModel.findById(uid);
  }
  async update(uid: string, data: any): Promise<boolean> {
    const validateUid = Types.ObjectId.isValid(uid);
    if (!validateUid)
      throw new HttpException('invalid uid', HttpStatus.BAD_REQUEST);
    return await this.userModel.findByIdAndUpdate(
      uid,
      { ...data },
      { new: true },
    );
  }
  async delete(uid: string): Promise<boolean> {
    const validateUid = Types.ObjectId.isValid(uid);
    if (!validateUid)
      throw new HttpException('invalid uid', HttpStatus.BAD_REQUEST);
    return await this.userModel.findByIdAndDelete(uid);
  }
}
