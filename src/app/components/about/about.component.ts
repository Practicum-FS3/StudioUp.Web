import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private router: Router) {}
  arr=[
    {content:' ננהנב עבהנ הנבנעי כמעיכ יעכעיר אטגעהנ העכעיע יעעעעע יעייכי ככעכע',name:'כ.צ'},
    {content:'ממש חויה כל פעם להגיע ולהתעמל עם כזה צוות מקסים ומקום מרווח ומאובזר',name:'ח.מ'},
    {content:'ציוד חדיש ומתקדם שכיף לבא מרחוק ולהתעמל',name:'ש.ל'},
    {content:'יוד חדיש ומתקדם שכיף לבא מרחוק ולהתעמל',name:'ב.א'},
    {content:'ממש חויה כל פעם להגיע ולהתעמל עם כזה צוות מקסים ומקום מרווח ומאובזר',name:''},
    {content:'ממש חויה כל פעם להגיע ולהתעמל עם כזה צוות מקסים ומקום מרווח ומאובזר',name:'ה.ל'},
    {content:'ממש חויה כל פעם להגיע ולהתעמל עם כזה צוות מקסים ומקום מרווח ומאובזר',name:''},
    {content:'ממש חויה כל פעם להגיע ולהתעמל עם כזה צוות מקסים ומקום מרווח ומאובזר',name:'ה.ל'}
   ]

}
