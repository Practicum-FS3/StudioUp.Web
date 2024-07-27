import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeAboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
