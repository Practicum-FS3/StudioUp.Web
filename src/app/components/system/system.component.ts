import { Component } from '@angular/core';
import { CustomerTypeDTO, Training, TrainingTypeDTO } from '../../models/Training';
import { DataService } from '../../services/TrainingService/data.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent {
  days = ['מוצשק', 'שישי', 'חמישי', 'רביעי', 'שלישי', 'שני', 'ראשון'];
  numbersArray = [1, 2, 3, 4, 5, 6, 7];
  maxCount = 0;
  arr: Array<Training> | undefined
  groupedItems: Array<Array<Training>> = []
  index: number = 0

  rek: Training = {
    id: 0, trainingTypeID: 0, trainerID: 0, dayOfWeek: 0,
    customerTypeID: 0,
    hour: { hour: 0, minute: 0 }, participantsCount: 0, isActive: false
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
          if (a.hour.hour !== b.hour.hour) {
            return a.hour.hour - b.hour.hour;
          }
          return a.hour.minute - b.hour.minute;
        }));
      }

      console.log(this.groupedItems);

      for (var item of this.groupedItems) {
        if (item.length < this.maxCount)
          for (let i = 0; i < item.length; i++) {
            if (14 < item[i].hour.hour) {
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

  getTrainingType(id: number): TrainingTypeDTO | undefined {
    this.dataService.getTrainingType(id).subscribe(data => {
      return data;
    })
    return undefined;
  }
  getCustomerType(id: number): CustomerTypeDTO | undefined {

    this.dataService.getCustomerType(id).subscribe(data => {
      return data;
    })
    return undefined;
  }

}
