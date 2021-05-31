import { Injectable } from '@angular/core';

const JWT_KEY = 'jwt-key';
const USER_KEY = 'user-key';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(JWT_KEY);
    window.sessionStorage.setItem(JWT_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(JWT_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

}
