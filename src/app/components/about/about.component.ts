import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from '../../services/generic.service'
import { ContentType } from '../../models/contentType';
import { ContentSections } from '../../models/contentSection';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  content: ContentType | undefined;
homeContent:ContentType | undefined
  constructor(private genericService: GenericService) {
console.log('hello');

    this.genericService.getByIdWithContent(4).subscribe(data => {
      this.content = data
      // console.log('this.content',this.content);
      // console.log('hupopppo',this.content.contentSections);
    
      // console.log('this.content.Title',this.content.title);
      // console.log('hupo',this.content.contentSections);
// console.log(this.content.contentSections.section1);

    })
    this.genericService.GetByIdWithContentSectionHPOnly(4).subscribe(data => {
      this.homeContent = data
      // console.log('this.homeContent',this.homeContent);
      
    })

  }

 
  





  contentType = {
    ID: 4,
    title: 'מספרים עלינו',
    // Description: '',
    // LinkHP: '',
    ContentSections: [
    { ID:1,
      ContentTypeID:4,
      Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
      ,
      Section2:'ה.ל',
      IsActive:true,
      ViewInHP:false},
      { ID:2,
        ContentTypeID:4,
        Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
        ,
        Section2:'חנה.ל',
        IsActive:true,
        ViewInHP:false},
        { ID:3,
          ContentTypeID:4,
          Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
          ,
          Section2:'סימה.ל',
          IsActive:true,
          ViewInHP:false},
          { ID:4,
            ContentTypeID:4,
            Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
            ,
            Section2:'חיה.ל',
            IsActive:true,
            ViewInHP:false},
            { ID:5,
              ContentTypeID:4,
              Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
              ,
              Section2:'לאה.ל',
              IsActive:true,
              ViewInHP:false},
              { ID:6,
                ContentTypeID:4,
                Section1: 'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
                ,
                Section2:'שולה.ל',
                IsActive:true,
                ViewInHP:false},
    ]
  }
}
