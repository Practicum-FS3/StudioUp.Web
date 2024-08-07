import { Component, Input } from '@angular/core';
import { AvailableTraining } from '../../models/AvailableTrainingCalander';
import { DataService } from '../../services/TrainingService/data.service';

@Component({
  selector: 'app-details-and-registration',
  templateUrl: './details-and-registration.component.html',
  styleUrl: './details-and-registration.component.scss'
})
export class DetailsAndRegistrationComponent {
  @Input() CustomerID: number = 0
  @Input() TrainingId: number = 2
  days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'מוצש"ק'];
  questions = ['מה זה?', 'מי המורה?', 'באיזה יום השיעור?', 'באיזה שעה?', 'למי מיועד?']
  // date = new Date()
  // training: AvailableTraining = {
  //   customerTypeName: 'נשים', date: this.date, dayOfWeek: 2, hour: '10:30', id: 0,
  //   isActive: true, ParticipantsCount: 12, trainerName: 'חני', TrainingId: 1, trainingTypeName: 'פילאטיס'
  // }
  day: string | undefined
  information: Array<any> | undefined
  constructor(private dataService: DataService) {
    this.dataService.getAvailableTrainingById(this.TrainingId).subscribe(data => {
      console.log({ data });
      this.day = this.days[data.dayOfWeek - 1]
      this.information = [
        data.trainingTypeName,
        data.trainerName,
        this.day,
        data.hour,
        data.customerTypeName,
      ]
    })

  }


}
