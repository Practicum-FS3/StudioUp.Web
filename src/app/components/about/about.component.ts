import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../../services/generic.service'
import { ContentType } from '../../models/contentType';
// import { ContentSections } from '../../models/contentSection';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  content: ContentType | undefined;
  homeContent: ContentType | undefined;
  isHovered = false;

  constructor(private genericService: GenericService) {
    this.genericService.getByIdWithContent(1).subscribe(data => {
      this.content = data
      this.content.contentSections?.forEach((item, index) => {
        if (item.hasOwnProperty('section1') && typeof item.section1 === 'string' && item.section1.length > 120) {
          const trimmedString = item.section1.substring(0, 120);
          const lastSpaceIndex = trimmedString.lastIndexOf(' ');
          const truncatedString = lastSpaceIndex !== -1 ? trimmedString.substring(0, lastSpaceIndex) : trimmedString;
          const finalString = truncatedString + '...';
        }
      });

    })
    this.genericService.GetByIdWithContentSectionHPOnly(1).subscribe(data => {
      this.homeContent = data

    })
  }
  toggleHover() {
    this.isHovered = !this.isHovered;
  }
  showWindow(index: number): void {
    const hoverWindow = document.getElementById(`hoverWindow${index}`);
    if (hoverWindow) {
      hoverWindow.style.display = 'block';
    }
  }
}
