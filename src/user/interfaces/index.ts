import { UserDocument } from 'src/utils/schema';

export interface IUserService {
  create(data: any): Promise<UserDocument>;
  getAll(): Promise<UserDocument[]>;
  getOneBy(data: object): Promise<UserDocument>;
  getOneById(uid: string): Promise<UserDocument>;
  update(uid: string, data: any): Promise<boolean>;
  delete(uid: string): Promise<boolean>;
}
