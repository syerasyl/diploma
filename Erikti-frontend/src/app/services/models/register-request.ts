/* tslint:disable */
/* eslint-disable */
export interface RegisterRequest {
  password: string;
  role?: 'ADMIN' | 'VOLUNTEER' | 'ORGANIZATION';
  username: string;
  email: string;
}
