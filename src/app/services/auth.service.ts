import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7101/api/Auth';
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) {
   }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        this.loggedIn = true;
        // debugger
        return response.token;
      }))
  }

  // checkToken(): Observable<boolean> {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return new Observable<boolean>(observer => observer.next(false));
  //   }
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post<{ valid: boolean }>(`${this.apiUrl}/check-token`, {}, { headers })
  //     .pipe(map(response => {
  //       this.loggedIn = response.valid;
  //       return response.valid;
  //     }));
  // }
  checkToken(): Observable<boolean> {
    console.log("bbbb");
    
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable<boolean>(observer => observer.next(false));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/check-token`, {}, { headers }).pipe(
      map(response => {
        this.loggedIn = response.valid;
        // console.log(response.valid);

        return response.valid;
      }),
      catchError(error => {
        if (error.status === 401) {
          
          this.loggedIn = false;
        }
        return of(false);
      })
    );
  }
  
  isLoggedIn(): boolean {
    this.checkToken().subscribe(a => {
      this.loggedIn = a
    })
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }


}
