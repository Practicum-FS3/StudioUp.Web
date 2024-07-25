import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAreaComponent } from './components/PersonalArea/personal-area/personal-area.component';

const routes: Routes = [
  { path: "personal-area" ,component:PersonalAreaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
