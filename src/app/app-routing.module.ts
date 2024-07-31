import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './components/system/system.component';
import { AboutComponent } from './components/about/about.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { SubscriptionBenefitsComponent } from './components/subscription-benefits/subscription-benefits.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SignatureComponent } from './components/signature/signature.component';
import { HomeSubscriptionBenefitsComponent } from './components/home/home-subscription-benefits/home-subscription-benefits.component';
import { HmosComponent } from './components/hmos/hmos.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: '', component: HomeAboutComponent, children: [
      { path: '', component: HomeAboutComponent },
      { path: 'home-subscription-benefits', component: HomeSubscriptionBenefitsComponent }
    ]
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'home', component: HomeAboutComponent, children: [
      { path: '', component: HomeAboutComponent },
      { path: 'home-subscription-benefits', component: HomeSubscriptionBenefitsComponent }
    ]
  },
  { path: 'home/about', component: AboutComponent },
  { path: 'payment-options', component: PaymentOptionsComponent },
  { path: 'our-team', component: OurTeamComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscription-benefits', component: SubscriptionBenefitsComponent },
  { path: 'system', component: SystemComponent },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: 'signature', component: SignatureComponent },
  { path: 'hmos', component: HmosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
