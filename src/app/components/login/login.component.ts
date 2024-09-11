import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OAuthProvider } from 'appwrite';
import { EmailService } from '../../services/EmailService/email.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  errorMassage: string = '';
  user: any;
  userEmail: string = '';
  emailAddress: string = '';

  constructor(private authService: AuthService, private router: Router, private emailService: EmailService) { }

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
        // 'http://localhost:4200/callback',
        // 'http://localhost:4200/login',
        // replace it
        ['profile', 'email']
      );
    } catch (error) {
      console.error('Login failed', error);

      if (error instanceof HttpErrorResponse) {
        if (error.status === 500) {
          this.errorMassage = 'שגיאת התחברות';
        } else if (error.status === 404) {
          this.errorMassage = 'משתמש לא רשום';
        } else {
          this.errorMassage = 'שגיאה לא ידועה';
        }
      } else {
        this.errorMassage = 'שגיאה לא צפויה';
      }
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
          this.errorMassage = 'משתמש לא רשום';
          return Promise.reject(new Error('User not found'));
        }
      })
      .then(valid => {
        if (valid) {
          console.log('Token is valid');
          this.router.navigate(['/home']);
        } else {
          console.log('Token is invalid');
          this.errorMassage = 'Token is invalid';
        }
      })
      .catch(error => {
        console.error('Error during OAuth redirect handling', error);

        if (error.status === 401) {
          this.errorMassage = 'משתמש לא רשום';
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


  sendForgotPasswordEmail() {
    if (!this.emailAddress) {
      console.error('Email address is required');
      return;
    }

    this.authService.retrievePassword(this.emailAddress)
      .subscribe(
        (password: string) => {
          if (!password) {
            console.error('Password retrieval failed: Password is null or undefined');
            return;
          }

          const subject = 'Studio Up sent you email';
          const body = 'Your password is: ' + password;

          this.emailService.sendEmail(this.emailAddress, subject, body)
            .subscribe(
              response => {
                console.log('Email sent successfully:', response);
                this.router.navigate(['/login']);
              },
              error => {
                console.error('Error sending email:', error);
                alert('.אירעה שיגאה במהלך שליחת המייל, בבקשה נסה שוב');
              }
            );
        },
        error => {
          console.error('Error retrieving password:', error);
          alert('אירעה שגיאה באחזור הסיסמה, אנא נסה שוב.');
        }
      );
  }

}
