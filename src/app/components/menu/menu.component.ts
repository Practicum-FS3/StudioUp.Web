import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  items: any[];

  constructor() {
    this.items = [
    { label: 'בית', routerLink: '/home', id: 'first', class: 'nav-item nav-link active' },
    { label: 'אודות', routerLink: '/about', class: 'nav-item nav-link p-menuitem-link' },
    { label: 'סוגי אימונים', routerLink: '/training', class: 'nav-item nav-link p-menuitem-link' },
    { label: 'לקוחות מספרים', routerLink: '/testimonials', class: 'nav-item nav-link p-menuitem-link' },
    { label: 'מערכת קורסים', routerLink: '/system', class: 'nav-item nav-link p-menuitem-link' },
    { label: 'מסלולי מנויים', routerLink: '/SubscriptionBenefits', class: 'nav-item nav-link p-menuitem-link' },
    { label: 'מחירון', routerLink: '/pricing', class: 'nav-item nav-link p-menuitem-link' },
    { label: 'צור קשר', routerLink: '/contact', class: 'nav-item nav-link p-menuitem-link' },
    { label: 'לאיזור האישי', routerLink: '/login', class: 'nav-item nav-link fixed-login' }
    ];
  }
}
