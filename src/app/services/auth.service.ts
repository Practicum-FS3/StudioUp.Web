import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account, Client } from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://localhost:7101/api/Auth';
  private apiUrl = 'replace it';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  client: Client;
  account: Account;

  constructor(private http: HttpClient) {
    this.client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('replace it');
    this.account = new Account(this.client);
    this.checkToken().subscribe();
  }

  getAccount() {
    return this.account;
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        this.loggedInSubject.next(true);
        return response.token;
      }))
  }

  loginWithGoogle(email: string): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/loginWithGoogle`, { email })
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);
          return response.token;
        } else {
          throw new Error('Token is missing from response');
        }
      }));
  }

  checkToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loggedInSubject.next(false);
      return of(false);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/check-token`, {}, { headers }).pipe(
      map(response => {
        this.loggedInSubject.next(response.valid);
        return response.valid;
      }),
      catchError(error => {
        if (error.status === 401) {
          this.loggedInSubject.next(false);
        }
        return of(false);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  logout() {
    this.loggedInSubject.next(false);
    localStorage.removeItem('token');
  }


  retrievePassword(email: string): Observable<string> {
    const passwordRequest = {
      email: email
    };

    return this.http.post<string>(`${this.apiUrl}/forget-password`, passwordRequest);
  }

}
