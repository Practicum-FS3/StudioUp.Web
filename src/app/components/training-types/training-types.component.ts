import { Component } from '@angular/core';
import { Training } from '../../models/Training';
import { ContentType } from '../../models/contentType';
import { GenericService } from '../../services/generic.service';
import { ContentSections } from '../../models/contentSection';

@Component({
  selector: 'app-training-types',
  templateUrl: './training-types.component.html',
  styleUrl: './training-types.component.scss'
})
export class TrainingTypesComponent {
  content: ContentType | undefined;
  contentHP: ContentType | undefined;
  // contentSections : ContentSections [] =[];
  //מחליף;
  contentSections : ContentSections [] = [
    {
        contentTypeID: 1,
        section1: 'פילאטיס',
        section2: 'פילאטיס זו שיטה המאפשרת עבודה מתוך הבנת הגוף ותנועתו, תנאי היסוד שלה הם ריכוז וייצוב, הריכוז הוא הקשבה לגוף בזמן התנועה ,וייצוב הוא העוזר לנו לנוע בחופשיות ובשליטה. כל תרגיל שנעשה בשיעור יתמקד בייצוב כנגד תנועה מה שמחזק ומשפר את שרירי הבטן הפנימיים ושרירים מייצבים נוספים .',
        section3: 'שיטה זו מפתחת מודעות גופנית גבוהה, משפרת את היציבה , מאמנת לשיווי משקל, משפרת תפקודי נשימה, תורמת לחיזוק ועיצוב הגוף ומקלה משמעותית לכאבי גב בסטודיו קיימים 3 סוגים-',
        isActive: false,
        viewInHP: true
    },
    {
        contentTypeID: 1,
        section1: 'פילאטיס קלאסי',
        section2: 'הפילאטיס המקורי, מתאים למי שאוהבת עבודה עמוקה ויסודית ורוצה לחזק את שרירי הבטן העמוקים ועל הדרך לחטב גם ירכיים',
        isActive: false,
        viewInHP: false
    },
    {
        contentTypeID: 1,
        section1: 'פילאטיס דינאמי',
        section2: 'גם הוא מתבסס על השיטה אך בשונה מקודמו כולל גם קטעים תנועתיים דינמיים לחימום השיעור ובמעברים בין התרגילים',
        isActive: false,
        viewInHP: false
    },
    {
        contentTypeID: 1,
        section1: 'פילאטיס ר.אגן',
        section2: 'כולל התעמלות הדרגתית בדגש על חיזוק ושיקום שרירי ר. אגן ובטן תחתונה מתאים לנשים אחרי לידה וגיל המעבר בכל גיל, נלמד מאוד אתה לנשום ולנשוף נכון כדי להחזיר את הבטן לקדמותה בלי לפגוע בשרירי ר האגן , מובן שנעבוד עם כל שרירי הגוף בהתבס על שיטת פילאטיס עקרונותיה ושיפוריה',
        isActive: false,
        viewInHP: false
    }
];

  constructor(private genericService: GenericService) { 
      this.genericService.getByIdWithContent(1).subscribe(data =>{
        this.content = data
        if (this.content.contentSections) {
          this.contentSections = this.content.contentSections;
        } else {
          console.log('ContentSections is undefined');
        }
      })

     }
      toggleAccordion(index: number): void {
        this.contentSections.forEach((contentSectionsItem, i) => {
            if (i === index) {
                contentSectionsItem.isActive = !contentSectionsItem.isActive; 
            } else {
                contentSectionsItem.isActive = false; 
            }
        });
  }
}