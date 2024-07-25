
import { Component, HostListener } from '@angular/core';
import { Training } from '../../models/TrainingCalander';
import { DataService } from '../../services/TrainingService/data.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss',
})
export class SystemComponent {
  days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'מוצש"ק'];
  numbersArray = [1, 2, 3, 4, 5, 6, 7];
  maxCount = 0;
  arr: Array<Training> | undefined
  groupedItems: Array<Array<Training>> = []
  index: number = 0
  screenWidth: number = window.innerWidth;
  rek: Training = {
    id: 0, trainerID: 0, dayOfWeek: 0,
    trainerName: '', customerTypeName: '', trainingTypeName: '',
    hour: '', isActive: false
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (event.target instanceof Window) {
      this.screenWidth = (<Window>event.target).innerWidth;
    }
  }
  constructor(private dataService: DataService) {


    this.dataService.getAll().subscribe(data => {
      this.arr = data
      console.log({ data });

      for (var day of this.numbersArray) {
        if (this.arr.filter(x => x.dayOfWeek == day).length > this.maxCount) {
          this.maxCount = this.arr.filter(x => x.dayOfWeek == day).length
        }

        this.groupedItems?.push(this.arr.filter(x => x.dayOfWeek == day).sort((a, b) => {
          let hourA = a.hour.charAt(0) + a.hour.charAt(1);
          let hourB = b.hour.charAt(0) + b.hour.charAt(1);
          let minutA = a.hour.charAt(3) + a.hour.charAt(4);
          let minutB = b.hour.charAt(3) + b.hour.charAt(4);

          if (hourA !== hourB) {
            return parseInt(hourA) - parseInt(hourB);
          }
          return parseInt(minutA) - parseInt(minutB);

        }));
      }

      console.log(this.groupedItems);

      for (var item of this.groupedItems) {
        if (item.length < this.maxCount)
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


