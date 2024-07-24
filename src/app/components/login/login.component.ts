import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email!: string;
  password!: string;
  errorMassage: string = '';
  constructor(private authService: AuthService) {
    
  }
  onsubmit(){
    this.authService.login(this.email, this.password).subscribe(
      token => {
        console.log('Token', token);
        localStorage.setItem('token', token);
        this.authService.checkToken(token).subscribe(
          valid => {
            if (valid) {
              console.log('Token is valid')
              //הפניה ךדף הבית
              //?????
            } else {
              console.log('Token is invalid');
            }
          },
          error => {
            console.error('Token validation error', error);
            this.errorMassage = 'Token is invalid';

          }

        );
      },
      error => {
        console.error('Login error', error);
        this.errorMassage = 'משתמש לא קיים';
        //מתי זה משתמש לא קיים ומתי נופל
      }
    );
  }

}
