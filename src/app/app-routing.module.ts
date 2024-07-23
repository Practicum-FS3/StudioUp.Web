import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  import { SystemComponent } from './components/system/system.component';
import { AboutComponent } from './components/about/about.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';

const routes: Routes = [
  {path:'',component:HomeAboutComponent},
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeAboutComponent},
  {path:'home/about',component:AboutComponent},
  {path:'', component:SystemComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
