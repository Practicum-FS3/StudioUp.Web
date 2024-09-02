import { Component, OnInit } from '@angular/core';
import { ContentType } from '../../models/contentType';
import { ContentSections } from '../../models/contentSection';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  homePageContent:ContentType={
    iD:2,
    title:'סטודיו אפ',
    title1:'המקום שלך לאימון כושר חוויתי',
    title2:'לשיעורי הסטודיו',
    contentSections:sectionContent
  }
  ngOnInit(): void {

  }
}
const sectionContent:ContentSections[]=[
  {
    id:1,
    contentTypeID:2,
    section1: 'לבריאות שלך',
    section2: "../../../assets/images/Group 46.png",
    viewInHP:true
  },
  {
    id:2,
    contentTypeID:2,
    section1:'להתקדמות שלך',
    section2: "../../../assets/images/Vector 39.png",
    viewInHP:true
  },
  {
    id:3,
    contentTypeID:2,
    section1:'למראה שלך',
    section2: "../../../assets/images/Star 2.png",
    viewInHP: true
  }
]
