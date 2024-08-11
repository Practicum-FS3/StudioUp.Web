import { Component, OnInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-after-registration',
  templateUrl: './after-registration.component.html',
  styleUrl: './after-registration.component.scss'
})
export class AfterRegistrationComponent implements OnInit {
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
