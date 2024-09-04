import { HttpClient } from '@angular/common/http';
import { Component,viewChild,ElementRef} from '@angular/core';
import { loadZone } from 'zone.js/lib/zone';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.scss'
})
export class SignatureComponent {

  signaturePadOptions: Object = {
    minWidth: 3, // Set the minimum width of the pen
    maxWidth: 5, // Set the maximum width of the pen
    penColor: "red" ,// Set the pen color to black (RGB value)
     backgroundColor: 'white',
     canvasHeight:400,
    canvasWidth:800
  };
  signatureData: string=''; // Variable to store signature data

  constructor(private http: HttpClient) {}

  // clearSignature():void {
  //   console.log('clear');
    
  //   // this.signaturePad.clear(); // Clear the signature pad
  // }
  // saveSignature(signaturepad:any):void {
  //   console.log({signaturepad},'save');
    
  //   const signatureData = this.signaturePadOptions.toDataURL(); // Get the signature data as a base64-encoded PNG
  
  //   // You can now save the signatureData to your database using a service or API call
  //   // For example, if you have a signature service:
  //   this.signatureService.saveSignature(signatureData)
  //     .subscribe(response => {
  //       console.log('Signature saved successfully:', response);
  //       // Optionally, you can show a success message or perform any other actions
  //     }, error => {
  //       console.error('Error saving signature:', error);
  //       // Handle the error, show an error message, etc.
  //     }
  // }
  
  captureSignature(): void {
    console.log('hi');
    console.log(this.signatureData);
    
    this.signatureData='hello'
    // Logic to capture the signature from the canvas and convert it to base64
    // Assign the converted signature data to this.signatureData
  }

  saveSignature(signaturePadOptions:any): void {
    console.log('by');
    
    // Send the signature data to the backend server
    const clientId = 'CLIENT_ID'; // Replace with actual client ID
    this.http.post('http://your-backend-api-url/save-signature', { clientId, signature: this.signatureData })
      .subscribe(
        (response) => {
          console.log('Signature saved successfully:', response);
          // Handle success (e.g., show a success message)
        },
        (error) => {
          console.error('Error saving signature:', error);
          // Handle error (e.g., show an error message)
        }
      );
  } 
  save(){
    console.log('save');
    
  }
  cancel(){
    console.log('cancel');
    this.signaturePadOptions = {
     
    };
  }

    }  

