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
    attended:false,
    isRegistered:false
    
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (event.target instanceof Window) {
      this.screenWidth = (<Window>event.target).innerWidth;
    }
  }
  constructor(private dataService: DataService) {
    this.dataService.GetAllTrainingsDetailsForCustomer(1).subscribe(data => {

      this.arr = data
      
      for (var day of this.numbersArray) {
        if (this.arr.filter(x => x.dayOfWeek == day).length > this.maxCount) {
          this.maxCount = this.arr.filter(x => x.dayOfWeek == day).length
        }        
        this.groupedItems?.push(this.arr.filter(x => x.dayOfWeek == day).sort((a, b) => {
          let hourA = a.time.charAt(0) + a.time.charAt(1);
          let hourB = b.time.charAt(0) + b.time.charAt(1);
          let minutA = a.time.charAt(3) + a.time.charAt(4);
          let minutB = b.time.charAt(3) + b.time.charAt(4);
        
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


