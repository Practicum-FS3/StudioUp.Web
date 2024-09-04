// src/app/components/subscription-detail/subscription-detail.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionType } from '../../../models/SubscriptionType';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss']
})
export class SubscriptionDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public subscription: SubscriptionType
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
