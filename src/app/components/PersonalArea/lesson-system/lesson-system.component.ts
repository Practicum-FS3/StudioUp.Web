import { Component, HostListener } from '@angular/core';
import { AvailableTraining } from '../../../models/AvailableTrainingCalander';
import { DataService } from '../../../services/personal-area/data.service';

@Component({
  selector: 'app-lesson-system',
  templateUrl: './lesson-system.component.html',
  styleUrl: './lesson-system.component.scss'
})
export class LessonSystemComponent {
  days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'מוצש"ק'];
  numbersArray = [1, 2, 3, 4, 5, 6, 7];
  maxCount = 0;
  arr: Array<AvailableTraining> | undefined
  groupedItems: Array<Array<AvailableTraining>> = []
  index: number = 0
  screenWidth: number = window.innerWidth;
  rek: AvailableTraining = {
    id: 0,
    TrainingId: 0,
    trainerName: '',
    date:new Date(),
    dayOfWeek: 0,
    hour: '',
    customerTypeName:'',
    trainingTypeName:'',
    ParticipantsCount:0,
    isActive: false
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (event.target instanceof Window) {
      this.screenWidth = (<Window>event.target).innerWidth;
    }
  }
  constructor(private dataService: DataService) {

    this.dataService.getAllAvailableTraining().subscribe(data => {
      this.arr = data
      console.log({ data });

      for (var day of this.numbersArray) {
        if (this.arr.filter(x => x.dayOfWeek == day).length > this.maxCount) {
          this.maxCount = this.arr.filter(x => x.dayOfWeek == day).length
        }
        console.log('ayala');

        this.groupedItems?.push(this.arr.filter(x => x.dayOfWeek == day).sort((a, b) => {

          console.log('!!!!????');
          
          console.log({a, b});
          
          let hourA = a.hour.charAt(0) + a.hour.charAt(1);
          let hourB = b.hour.charAt(0) + b.hour.charAt(1);
          let minutA = a.hour.charAt(3) + a.hour.charAt(4);
          let minutB = b.hour.charAt(3) + b.hour.charAt(4);
           
             console.log('groupedItems');
             console.log(this.groupedItems);

//מה קורה כשזה אותה שעה?
          if (hourA !== hourB) {
            return parseInt(hourA) - parseInt(hourB);
          }
          return parseInt(minutA) - parseInt(minutB);


        }));
     
      }
     
//צריכה הסבר- זה נראה שמסדר לפי שעה
      for (var item of this.groupedItems) {
        //item   ---המערך של השיעורים של יום אחד  
        if (item.length < this.maxCount)
          //אבל הוא תמיד באורך המקסימלי אז למה צריך את זה?
          for (let i = 0; i < item.length; i++) {
            if (14 < parseInt(item[i].hour.charAt(0) + item[i].hour.charAt(1))) {
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


