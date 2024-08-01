import { Component, OnInit } from '@angular/core';
import { CustomerSubscription } from '../../models/customerSubscription';
import { CustomerSubscriptionService } from '../../services/customer-subscription.service';

@Component({
  selector: 'app-customer-sub-history',
  templateUrl: './customer-sub-history.component.html',
  styleUrl: './customer-sub-history.component.scss'
})
export class CustomerSubHistoryComponent implements OnInit {
  subscriptions: CustomerSubscription[] = [];

  ngOnInit() {
    console.log('customer-sub-history intered');
    this.subscriptions = [
      new CustomerSubscription(1, 101, 5, new Date('2023-01-01')),
      new CustomerSubscription(2, 102, 6, new Date('2023-02-01')),
      new CustomerSubscription(3, 454, 7, new Date('2023-06-01')),
    ];
  }

  //רק מי שעובד לה החיבור מפה לדאטה והוא מלא בטבלה של CustomerSubscription
  // שתשתמש בזה- זה מביא נתונים מש כמובן

  // constructor(private subscriptionService: CustomerSubscriptionService) { }
  // ngOnInit() {
  //   console.log('server customer-sub-history intered');
  //   this.subscriptionService.getAll().subscribe(data => {
  //     this.subscriptions = data;
  //     console.log(data);
  //   })
  // }
}