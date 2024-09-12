import { Component, Input } from '@angular/core';
import { DataService } from '../../services/TrainingService/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details-and-registration',
  templateUrl: './details-and-registration.component.html',
  styleUrl: './details-and-registration.component.scss'
})
export class DetailsAndRegistrationComponent {
  @Input() CustomerID!: string |null
  @Input() TrainingId!: string|null ;
  days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'מוצש"ק'];
  questions = ['מה סוג האימון?', 'מי המאמנת?', 'באיזה יום?', 'באיזו שעה?', 'למי מיועד?']
  day: string | undefined
  information: Array<any> | undefined
  constructor(private dataService: DataService,private route: ActivatedRoute) {
    this.CustomerID = this.route.snapshot.paramMap.get('CustomerID');
    this.TrainingId = this.route.snapshot.paramMap.get('TrainingId');
    console.log(this.CustomerID);
    console.log(this.TrainingId);
    
    
    this.dataService.getAvailableTrainingById(Number(this.TrainingId)).subscribe(data => {
      this.day = this.days[data.dayOfWeek - 1]
      this.information = [
        data.trainingTypeName,
        data.trainerName,
        this.day,
        data.time,
        data.customerTypeName,
      ]
    })

  }
  enrollment(){
    console.log("פה צריכה להיות הרשמה בפועל");  
  }
  


}
