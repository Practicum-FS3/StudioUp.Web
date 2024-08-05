import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../services/generic.service';
import { ContentType } from '../../../models/contentType';

@Component({
  selector: 'app-home-subscription-benefits',
  templateUrl: './home-subscription-benefits.component.html',
  styleUrl: './home-subscription-benefits.component.scss'
})
export class HomeSubscriptionBenefitsComponent implements OnInit {

  constructor(public pos:GenericService){}

  ngOnInit(): void {
    debugger
    
    this.pos.getByIdWithContent(this.id).subscribe(
      
      succ=>{
        this.s=succ
        console.log(this.s);
        
      },
      err=>{
        debugger
        console.log(err);
      }
        
    )
  }

  id:number = 3
  s:ContentType = new ContentType()
  
}
