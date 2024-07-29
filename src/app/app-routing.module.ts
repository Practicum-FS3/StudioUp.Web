import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { SystemComponent } from './components/system/system.component';
import { AboutComponent } from './components/about/about.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:'',component:HomeAboutComponent},
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeAboutComponent},
  {path:'home/about',component:AboutComponent},
  // {path:'', component:SystemComponent},
  {path:'payment-options',component:PaymentOptionsComponent},
  {path:'our-team',component:OurTeamComponent},
  {path:'login',component:LoginComponent},
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
