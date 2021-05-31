import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStoreService } from './token-store.service';

const AUTH_API = 'http://localhost:8080/api/v01/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private tokenStore: TokenStoreService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  forgetpassword(email: string): Observable<any> {
    let getheader = new Headers();
    getheader.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append("email", email);
    return this.http.get(AUTH_API + 'forgetpassword', { headers: getheader, search: params });
  }
}
