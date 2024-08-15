import { Component, HostListener } from '@angular/core';
import { AvailableTraining } from '../../../models/AvailableTrainingCalander';
import { DataService } from '../../../services/personal-area/data.service';

@Component({
  selector: 'app-lesson-system',
  templateUrl: './lesson-system.component.html',
  styleUrl: './lesson-system.component.scss'
})
export class LessonSystemComponent {
  thisDay=new Date()
  Ayala={id:1,Att:false,reg:true}
  days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'מוצש"ק'];
  numbersArray = [1, 2, 3, 4, 5, 6, 7];
  maxCount = 0;
  arr: Array<AvailableTraining> | undefined
  groupedItems: Array<Array<AvailableTraining>> = []
  index: number = 0
  screenWidth: number = window.innerWidth;
  rek: AvailableTraining = {
    id: 0,
    trainingId: 0,
    trainerName: '',
    date:new Date(),
    dayOfWeek: 0,
    time: '',
    customerTypeName:'',
    trainingTypeName:'',
    participantsCount:0,
    isActive: false,
    attend:false,
    register:false
    
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (event.target instanceof Window) {
      this.screenWidth = (<Window>event.target).innerWidth;
    }
  }
  constructor(private dataService: DataService) {
    this.dataService.GetAllTrainingsDetailsForCustomer(1).subscribe(data => {
      // this.arr =[
      //   {
      //     "id": 1,
      //     "trainingId": 2,
      //     "trainerName": "רחלי זוארץ",
      //     "date": new Date("2024-08-12"),
      //     "dayOfWeek": 2,
      //     "time": "10:45",
      //     "customerTypeName": "נשים",
      //     "trainingTypeName": "פילאטיס",
      //     "participantsCount": 12,
      //     "isActive": true,
      //     "attend":true,
      //     "register":'נרשמתי'
      //   },
      //   {
      //     "id": 3,
      //     "trainingId": 8,
      //     "trainerName": "רחלי זוארץ",
      //     "date":new Date( "2024-08-12"),
      //     "dayOfWeek": 2,
      //     "time": "10:45",
      //     "customerTypeName": "נשים",
      //     "trainingTypeName": "פילאטיס",
      //     "participantsCount": 17,
      //     "isActive": true,
      //     "attend":false,
      //     "register":""
      //   },
      //   {
      //     "id": 4,
      //     "trainingId": 10,
      //     "trainerName": "חיה שווירץ",
      //     "date": new Date("2024-08-12"),
      //     "dayOfWeek": 2,
      //     "time": "17:30",
      //     "customerTypeName": "נשים",
      //     "trainingTypeName": "פילאטיס",
      //     "participantsCount": 9,
      //     "isActive": true,
      //      "attend":false,
      //     "register":"נרשמתי"
      //   },
      //   {
      //     "id": 5,
      //     "trainingId": 12,
      //     "trainerName": "רחלי זוארץ",
      //     "date":new Date( "2024-08-14"),
      //     "dayOfWeek": 4,
      //     "time": "14:30",
      //     "customerTypeName": "נשים",
      //     "trainingTypeName": "פילאטיס",
      //     "participantsCount": 5,
      //     "isActive": true,
      //     "attend":false,
      //     "register":'נרשמתי'
      //   },
      //   {
      //     "id": 5,
      //     "trainingId": 12,
      //     "trainerName": "רחלי זוארץ",
      //     "date":new Date( "2024-08-14"),
      //     "dayOfWeek": 4,
      //     "time": "14:30",
      //     "customerTypeName": "נשים ונערות",
      //     "trainingTypeName": "התעמלות קרקע",
      //     "participantsCount": 5,
      //     "isActive": true,
      //     "attend":false,
      //     "register":''
      //   },
      //   {
      //     "id": 5,
      //     "trainingId": 12,
      //     "trainerName": "מלכי ברין",
      //     "date":new Date( "2024-08-15"),
      //     "dayOfWeek": 5,
      //     "time": "17:30",
      //     "customerTypeName": "נשים",
      //     "trainingTypeName": "פילאטיס",
      //     "participantsCount": 5,
      //     "isActive": true,
      //     "attend":false,
      //     "register":''},
      //     {
      //       "id": 5,
      //       "trainingId": 12,
      //       "trainerName": "מלכי ברין",
      //       "date":new Date( "2024-08-11"),
      //       "dayOfWeek": 1,
      //       "time": "16:30",
      //       "customerTypeName": "נשים",
      //       "trainingTypeName": "פילאטיס",
      //       "participantsCount": 5,
      //       "isActive": true,
      //       "attend":false,
      //       "register":'br'}
      // ]
      this.arr = data
      console.log( this.arr);

      for (var day of this.numbersArray) {
        if (this.arr.filter(x => x.dayOfWeek == day).length > this.maxCount) {
          this.maxCount = this.arr.filter(x => x.dayOfWeek == day).length
        }
        console.log('ayala');
        this.groupedItems?.push(this.arr.filter(x => x.dayOfWeek == day).sort((a, b) => {

          let hourA = a.time.charAt(0) + a.time.charAt(1);
          let hourB = b.time.charAt(0) + b.time.charAt(1);
          let minutA = a.time.charAt(3) + a.time.charAt(4);
          let minutB = b.time.charAt(3) + b.time.charAt(4);
           
             console.log('groupedItems');
             console.log(this.groupedItems);
          if (hourA !== hourB) {
            return parseInt(hourA) - parseInt(hourB);
          }
          return parseInt(minutA) - parseInt(minutB);


        }));
     
      }
      
     
      for (var item of this.groupedItems) {
        if (item.length < this.maxCount)
          for (let i = 0; i < item.length; i++) {
            if (14 < parseInt(item[i].time.charAt(0) + item[i].time.charAt(1))) {
              this.index = i;
              break;
            } else {
              this.index = i + 1;
            }
          }
        for (let i = item.length; i < this.maxCount; i++) {
          item.splice(this.index, 0, this.rek);
          this.index++;
        }
        this.index = 0;

      }
    })

  }

}


