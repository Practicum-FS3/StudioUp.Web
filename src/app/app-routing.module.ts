import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './components/system/system.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';

const routes: Routes = [
  {path:'', component:SystemComponent}
  // {path:'',component:HomeAboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
