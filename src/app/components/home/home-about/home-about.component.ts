import { Component } from '@angular/core';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss'
})
export class HomeAboutComponent {
  arr=[
    {content:'השיעורים הם בשבילי הצלה! מעבר לכושר הם תחליף לטיפול פסיכולוגי ושחרור מהלחצים שבבית.'
      ,name:'כ.צ'},
    {content:'ממש חויה כל פעם להגיע ולהתעמל עם כזה צוות מקסים ומקום מרווח ומאובזר',name:'ח.מ'},
    {content:'ציוד חדיש ומתקדם שכיף לבא מרחוק ולהתעמל',name:'ש.ל'}]
}
