import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { ContentType } from '../../models/contentType';

@Component({
  selector: 'app-subscription-benefits',
  templateUrl: './subscription-benefits.component.html',
  styleUrl: './subscription-benefits.component.scss'
})
export class SubscriptionBenefitsComponent implements OnInit{

  constructor(public pos:GenericService){}

  ngOnInit(): void {
    
    this.pos.getByIdWithContent(this.id).subscribe(
      
      succ=>{
        this.s=succ
        console.log(this.s);
        
      },
      err=>{
        
        console.log(err);
      }
        
    )
  }

  id:number = 4
  s:ContentType = new ContentType()
}
