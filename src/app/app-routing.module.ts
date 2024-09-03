import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { SystemComponent } from './components/system/system.component';
import { AboutComponent } from './components/about/about.component';
import { SubscriptionBenefitsComponent } from './components/subscription-benefits/subscription-benefits.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { TrainingTypesComponent } from './components/training-types/training-types.component';
import { HomeTrainingTypesComponent } from './components/home/home-training-types/home-training-types.component';
const routes: Routes = [
  {path:"login", component:LoginComponent},
  // {path:'',component:HomeAboutComponent},
            {path:'',component:HomeTrainingTypesComponent},
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeAboutComponent},
  {path:'home/about',component:AboutComponent},
  {path:'system', component:SystemComponent},
  {path:'SubscriptionBenefits', component:SubscriptionBenefitsComponent},
  {path:'payment-options',component:PaymentOptionsComponent},
  {path:'our-team',component:OurTeamComponent},
  {path:'login',component:LoginComponent},
  { path: 'registration', component: RegistrationComponent },
  {path:'training',component:TrainingTypesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
