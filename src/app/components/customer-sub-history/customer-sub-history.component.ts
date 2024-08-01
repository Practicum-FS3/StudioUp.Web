import { Component, OnInit } from '@angular/core';
import { CustomerSubscription } from '../../models/customerSubscription';

@Component({
  selector: 'app-customer-sub-history',
  templateUrl: './customer-sub-history.component.html',
  styleUrl: './customer-sub-history.component.scss'
})
export class CustomerSubHistoryComponent implements OnInit {
  subscriptions: CustomerSubscription[] = [];

  ngOnInit() {
    this.subscriptions = [
      new CustomerSubscription(1, 101, 5, new Date('2023-01-01')),
      new CustomerSubscription(2, 102, 6, new Date('2023-02-01')),
      new CustomerSubscription(3, 454, 7, new Date('2023-06-01')),
    ];
  }
}
