import { BaseResponse } from '../BaseResponse/BaseResponse.interface';

export interface AuthResponse extends BaseResponse {
  data: User;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
