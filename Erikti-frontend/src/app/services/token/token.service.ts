import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get accessToken() {
    return localStorage.getItem('access_token') as string;
  }

  set refreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }
  get refreshToken() {
    return localStorage.getItem('refresh_token') as string;
  }

  deleteCache() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
