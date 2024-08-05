import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
<<<<<<< HEAD
import { ContactComponent } from './components/contact/contact.component';
=======
import { SystemComponent } from './components/system/system.component';
import { AboutComponent } from './components/about/about.component';
import { SubscriptionBenefitsComponent } from './components/subscription-benefits/subscription-benefits.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import {TracksComponent} from './components/tracks/tracks.component'
import { HmosComponent } from './components/hmos/hmos.component';
import { CustomerSubHistoryComponent } from './components/customer-sub-history/customer-sub-history.component';
import { HomeComponent } from './components/home/home.component';

>>>>>>> 0ac5439910b6aa86074059e0360e2b9c5d69bede

const routes: Routes = [
  //{path:"login", component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeAboutComponent},
  {path:'about',component:AboutComponent},
  {path:'home',component:HomeAboutComponent},
  {path:'home/about',component:AboutComponent},
<<<<<<< HEAD
  {path:'', component:SystemComponent},
  {path:'contact', component:ContactComponent}


=======
  {path:'system', component:SystemComponent},
  {path:'SubscriptionBenefits', component:SubscriptionBenefitsComponent},
  {path:'payment-options',component:PaymentOptionsComponent},
  {path:'our-team',component:OurTeamComponent},
  {path:'login',component:LoginComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'HMOs', component: HmosComponent },
  { path: 'subscriptionPerCustomer',component: CustomerSubHistoryComponent}
>>>>>>> 0ac5439910b6aa86074059e0360e2b9c5d69bede
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
