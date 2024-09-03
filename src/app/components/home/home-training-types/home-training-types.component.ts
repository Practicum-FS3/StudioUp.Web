import { Component } from '@angular/core';
import { ContentType } from '../../../models/contentType';
import { ContentSections } from '../../../models/contentSection';
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-home-training-types',
  templateUrl: './home-training-types.component.html',
  styleUrl: './home-training-types.component.scss'
})
export class HomeTrainingTypesComponent {

    contentHP: ContentType | undefined;
  
    constructor(private genericService: GenericService) { 

        this.genericService.GetByIdWithContentSectionHPOnly(1).subscribe(data =>{
          this.contentHP = data
        })
       
    }
  }
