import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSubscriptionService } from '../../services/customer-subscription.service';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { CustomerSubscription } from '../../models/customerSubscription';

@Component({
  selector: 'app-customer-sub-history',
  templateUrl: './customer-sub-history.component.html',
  styleUrls: ['./customer-sub-history.component.scss']
})
export class CustomerSubHistoryComponent implements OnInit {
  subscriptions: CustomerSubscription[] = [];
  currentSubscription: CustomerSubscription | undefined; // שדה למנוי הנוכחי

  constructor(
    private subscriptionService: CustomerSubscriptionService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('Subscription');
    this.subscriptionService.getAll().subscribe(data => {
      console.log(data);
      this.subscriptions = data;
      this.currentSubscription = this.subscriptions.find(subscription => subscription.isActive); // קביעת המנוי הנוכחי
      console.log('currentSubscription ' + this.currentSubscription);
    });
  }

  openSubscriptionDetail(subscriptionId: number): void {
    console.log(`open subscription, id-${subscriptionId}`);
    this.subscriptionService.getSubscriptionType(subscriptionId).subscribe(subscription => {
      const dialogRef = this.dialog.open(SubscriptionDetailComponent, {
        width: '500px',
        data: subscription
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }
}
