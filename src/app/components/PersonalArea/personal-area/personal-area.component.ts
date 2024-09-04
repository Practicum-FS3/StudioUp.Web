import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrl: './personal-area.component.scss'
})
export class PersonalAreaComponent {
  constructor(authServise: AuthService, private router: Router) {
    authServise.checkToken().subscribe(
      a => {
      }
    )

    this.performActionAfterDelay(() => {
      this.router.navigate(['/login']); // ניתוב לדף התחברות אם המשתמש לא מחובר
      authServise.checkToken().subscribe()
    }, 2);
  }

  performActionAfterDelay(action: () => void, delayInMinutes: number) {
    const delayInMilliseconds = delayInMinutes * 60 * 1000;
    timer(delayInMilliseconds).subscribe(() => {
      action();
    });
  }
}