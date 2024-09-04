import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})

export class ErrorMessageComponent {
  @Input() messageHeader: string = 'Error Message';
  @Input() messageContent: string = '';
  @Input() display: boolean = false;

  show(messageHeader:string, messageContent: string) {
    this.messageHeader=messageHeader;
    this.messageContent = messageContent;
    this.display = true;
  }
  hide() {
    this.display = false;
  }
}
