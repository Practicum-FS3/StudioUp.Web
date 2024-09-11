import { Component, Input, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.scss'
})
export class PdfGeneratorComponent {
  @Input() elementClass: string = '';
  @ViewChild(ErrorMessageComponent) errorMessageComponent!: ErrorMessageComponent;

  generatePDF() {
    const element = document.querySelector(`.${this.elementClass}`) as HTMLElement;
    if (element) {
      html2canvas(element, { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgWidth = 297;
        const pageHeight = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('document.pdf');
      }).catch(error=>{
        console.error('Error generating PDF',error);
        if(this.errorMessageComponent){
          this.errorMessageComponent.show('הורדת קובץ PDF נכשלה','נכשל בהורדת הקובץ. נסי שוב');
        }
      });
    }else{
      if(this.errorMessageComponent){
        this.errorMessageComponent.show('הרכיב לא נמצא','הרכיב שצויין לא נמצא');
      }
    }
  }
}

