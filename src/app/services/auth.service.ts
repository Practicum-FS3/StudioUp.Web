import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7101/api/Auth';
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        this.loggedIn = true;
        return response.token;
      }))
  }

  checkToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable<boolean>(observer => observer.next(false));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/check-token`, {}, { headers })
      .pipe(map(response => {
        this.loggedIn = response.valid;
        return response.valid;
      }));
  }
  
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }


}
