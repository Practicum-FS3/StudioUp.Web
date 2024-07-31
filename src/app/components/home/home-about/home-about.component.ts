import { Component } from '@angular/core';
import { ContentType } from '../../../models/contentType';
import { GenericService } from '../../../services/generic.service';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss'
})
export class HomeAboutComponent {

  content: ContentType | undefined;
  homeContent: ContentType | undefined
  isHovered = false;
  constructor(private genericService: GenericService) {


    this.genericService.getByIdWithContent(4).subscribe(data => {
      this.content = data
    })

    this.genericService.GetByIdWithContentSectionHPOnly(4).subscribe(data => {
      this.homeContent = data


      this.homeContent.contentSections?.forEach((item, index) => {
        if (item.hasOwnProperty('section1') && typeof item.section1 === 'string' && item.section1.length > 120) {
          const trimmedString = item.section1.substring(0, 120); 
          const lastSpaceIndex = trimmedString.lastIndexOf(' '); 
          const truncatedString = lastSpaceIndex !== -1 ? trimmedString.substring(0, lastSpaceIndex) : trimmedString;
          const finalString = truncatedString + '...';
        }
      });
    })

    }

    toggleHover() {
      this.isHovered = !this.isHovered;
    }
  }

