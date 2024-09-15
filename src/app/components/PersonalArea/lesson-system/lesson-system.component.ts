import { Component, HostListener } from '@angular/core';
import { AvailableTraining } from '../../../models/AvailableTrainingCalander';
import { DataService } from '../../../services/personal-area/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lesson-system',
  templateUrl: './lesson-system.component.html',
  styleUrl: './lesson-system.component.scss'
})
export class LessonSystemComponent {

  // אמור להיות currentCustomer
  // לשנות את כל ה-1 ל-ID שיהיה לו

  thisDay = new Date("2024-09-12").toJSON().slice(0, 10);
  thisHour = new Date().getHours();
  thisMinutes = new Date().getMinutes();


  days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'מוצש"ק'];
  numbersArray = [1, 2, 3, 4, 5, 6, 7];
  maxCount = 0;
  show = false;
  arr: Array<AvailableTraining> | undefined
  groupedItems: Array<Array<AvailableTraining>> = []
  index: number = 0
  screenWidth: number = window.innerWidth;
  rek: AvailableTraining = {
    id: 0,
    trainingId: 0,
    trainerName: '',
    date: new Date(),
    dayOfWeek: 0,
    time: '',
    customerTypeName: '',
    trainingTypeName: '',
    participantsCount: 0,
    isActive: false,
    attended: false,
    isRegistered: false
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (event.target instanceof Window) {
      this.screenWidth = (<Window>event.target).innerWidth;
    }
  }
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.GetAllTrainingsDetailsForCustomer(1).subscribe(data => {

      this.arr = data
      console.log({ data });
      console.log(this.thisHour);
      console.log(this.thisMinutes);

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

  navigateToLessonDetails(id: number, lessonId: number, isRegistered: boolean) {

    if (id !== 0 && isRegistered === false) {
      // this.show = true;
      this.router.navigate(['/details', 1, lessonId]);
    }
    else if (id !== 0 && isRegistered) {
      console.log("אמור לעבור לביטול הרשמה");

    }
  }

}


