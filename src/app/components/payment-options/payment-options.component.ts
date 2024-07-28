import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { ContentType } from '../../models/contentType';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrl: './payment-options.component.scss'
})
export class PaymentOptionsComponent implements OnInit{

   constructor(public pos: GenericService) { }

  ngOnInit(): void {
    
    this.pos.getByIdWithContent(this.id).subscribe(
      
      succ => {
        this.paymentOption = succ
        this.urlImg = 'data:image/png;base64,'

      }, 
      err => {
        debugger
         console.log(err) }

    )
  }


  paymentOption: ContentType = new ContentType()
  id: number = 1
  urlImg:string = ""
}
