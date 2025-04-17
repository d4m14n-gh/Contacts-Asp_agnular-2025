import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UserLoginDto, UserRegisterDto } from '../dto/user-login-dto';
import { Router } from '@angular/router';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth'; // Updated to match previous edits
  private tokenKey = 'jwt';


  constructor(private http: HttpClient, private router: Router) {}
  login(user: UserLoginDto) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['']);
    console.log('sign out!');
  }

  register(user: UserRegisterDto) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  
  getAuthorizationToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > (Date.now() / 1000);
  }
}
