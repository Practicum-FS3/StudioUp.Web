import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.scss'
})
export class PdfGeneratorComponent {
  @Input() elementClass:string='';

  generatePDF(){
   console.log('generate to pdf component')
   const element=document.querySelector(`.${this.elementClass}`) as HTMLElement;
   if(element){
     html2canvas(element,{useCORS:true}).then(canvas=>{
       const imgData = canvas.toDataURL('image/png');
       const pdf = new jsPDF('l', 'mm', 'a4');
       const imgWidth = 297;
       const pageHeight = 210;
       const imgHeight = canvas.height * imgWidth / canvas.width;
       let heightLeft = imgHeight;
 
       pdf.addImage(imgData, 'PNG', 0,0,imgWidth,imgHeight);
       heightLeft-=pageHeight;
 
       while(heightLeft>=0){
         pdf.addPage();
         pdf.addImage(imgData,'PNG',0,-heightLeft,imgWidth,imgHeight);
         heightLeft-=pageHeight;
       }
       pdf.save('document.pdf');
     })
   }
  } 
}

