import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.updateMenu(isLoggedIn);
    });
  }

  updateMenu(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.items = [
        { label: 'בית', routerLink: '/home', id: 'first', class: 'nav-item nav-link active' },
        { label: 'אודות', routerLink: '/about', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'סוגי אימונים', routerLink: '/training', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'לקוחות מספרים', routerLink: '/testimonials', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'מערכת קורסים', routerLink: '/system', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'מסלולי מנויים', routerLink: '/SubscriptionBenefits', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'מחירון', routerLink: '/pricing', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'צור קשר', routerLink: '/contact', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'אזור אישי', routerLink: '/personal-area', class: 'nav-item nav-link fixed-login' }
      ];
    } else {
      this.items = [
        { label: 'בית', routerLink: '/home', id: 'first', class: 'nav-item nav-link active' },
        { label: 'אודות', routerLink: '/about', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'סוגי אימונים', routerLink: '/training', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'לקוחות מספרים', routerLink: '/testimonials', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'מערכת קורסים', routerLink: '/system', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'מסלולי מנויים', routerLink: '/SubscriptionBenefits', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'מחירון', routerLink: '/pricing', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'צור קשר', routerLink: '/contact', class: 'nav-item nav-link p-menuitem-link' },
        { label: 'התחברות', routerLink: '/login', class: 'nav-item nav-link fixed-login' }
      ];
    }

  }
}
