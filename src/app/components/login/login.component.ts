import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OAuthProvider } from 'appwrite';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  email!: string;
  password!: string;
  errorMassage: string = '';
  user: any;
  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkLoginStatus();
    if (window.location.pathname === '/callback') {
      this.handleOAuthRedirect();
    }
  }

  onsubmit() {
    this.authService.login(this.email, this.password).subscribe(
      token => {
        console.log('Token', token);
        this.authService.checkToken().subscribe(
          valid => {
            if (valid) {
              console.log('Token is valid')
              this.router.navigate(['/home']);
            } else {
              console.log('Token is invalid');
              this.errorMassage = 'Token is invalid';
            }
          },
          error => {
            console.error('Token validation error', error);
            if (error.status === 403) {
              this.errorMassage = 'User not found';
            } else {
              this.errorMassage = 'Token validation error';
            }

          }

        );
      },
      error => {
        console.error('Login error', error);
        if (error.status === 401) {
          this.errorMassage = 'אחד או יותר מן הנתונים שהקשת אינם נכונים';
        } else {
          this.errorMassage = 'שגיאת התחברות';
        }
      }
    );
  }

async LoginWithGoogle() {
    try {
      await this.authService.getAccount().createOAuth2Session(
        OAuthProvider.Google,
        'http://localhost:4200/callback', // כתובת החזרה זמנית לפניה לשרת לבדוק את הרישום
        'http://localhost:4200/login', // כתובת להחזרה במקרה של כשלון
        ['profile', 'email'] // הרשאות מבוקשות
      );
    } catch (error) {
      console.error('Login failed', error);
      this.errorMassage = 'שגיאת התחברות';
    }
  }

  handleOAuthRedirect() {
    this.authService.getAccount().get()
      .then(account => {
        const email = account.email;
        return this.authService.loginWithGoogle(email).toPromise();
      })
      .then(token => {
        if (token) {
          console.log('Token', token);
          localStorage.setItem('token', token);
          return this.authService.checkToken().toPromise();
        } else {
          this.errorMassage = 'משתמש לא קיים';
          throw new Error('User not found');
        }
      })
      .then(valid => {
        if (valid) {
          console.log('Token is valid')
          this.router.navigate(['/home']);
        } else {
          console.log('Token is invalid');
          this.errorMassage = 'Token is invalid';
        }
      })
      .catch(error => {
        console.error('Error during OAuth redirect handling', error);
        if (error.message === 'User not found') {
          this.errorMassage = 'משתמש לא קיים';
        } else {
          this.errorMassage = 'שגיאת התחברות';
        }
      });
  }
  
  async checkLoginStatus() {
    try {
      this.user = await this.authService.getAccount().get();
      this.userEmail = this.user.email;
    } catch (error) {
      console.log('User is not logged in', error);
      this.user = null;
    }
  }

}
