import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email!: string;
  password!: string;
  errorMassage: string = '';
  constructor(private authService: AuthService, private router: Router) {

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



}
