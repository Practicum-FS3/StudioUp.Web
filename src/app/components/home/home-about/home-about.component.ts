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
  homeContent:ContentType | undefined
    constructor(private genericService: GenericService) {
  console.log('hello');
  
      this.genericService.getByIdWithContent(4).subscribe(data => {
        this.content = data
        console.log('this.content',this.content);
        console.log('hupopppo',this.content.contentSections);
      
        console.log('this.content.Title',this.content.title);
        console.log('hupo',this.content.contentSections);
  console.log('content.linkHp',this.content?.linkHP);
  
  
      })
      this.genericService.GetByIdWithContentSectionHPOnly(4).subscribe(data => {
        this.homeContent = data
        console.log('this.homeContent',this.homeContent);
        
      })
  
    }
  
 
  contentType = {
    ID: 1,
    title: 'לקוחות מספרים',
    // Description: '',
    LinkHP: '/about',
    title3: 'לקרא עוד',
    ContentSections: [
      {
        ID: 1,
        ContentTypeID: 1,
        Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.',
        Section2: 'הדסה.ל',
        // Section3:'string',
        IsActive: true,
        ViewInHP: true
      },
      {
        ID: 2,
        ContentTypeID: 1,
        Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
        ,
        Section2: 'חנה.ל',
        // Section3:'string',
        IsActive: true,
        ViewInHP: true
      },
      {
        ID: 3,
        ContentTypeID: 1,
        Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
        ,
        Section2: 'שרה.ל',
        // Section3:'string',
        IsActive: true,
        ViewInHP: true
      },

    ]
  }

}
