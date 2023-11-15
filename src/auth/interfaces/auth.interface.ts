import { LoginDetail } from '../types';

export interface IAuthService {
  login(data: LoginDetail): Promise<{
    access_token: string;
  }>;
}
