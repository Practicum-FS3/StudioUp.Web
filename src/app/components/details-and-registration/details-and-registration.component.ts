import { Component, Input } from '@angular/core';
import { Training } from '../../models/TrainingCalander';

@Component({
  selector: 'app-details-and-registration',
  templateUrl: './details-and-registration.component.html',
  styleUrl: './details-and-registration.component.scss'
})
export class DetailsAndRegistrationComponent {
  @Input() detailes: Training|undefined

}
