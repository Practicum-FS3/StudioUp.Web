import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'; // הוסף ייבוא זה
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { HmosComponent } from './components/hmos/hmos.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { AboutComponent } from './components/about/about.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { SystemComponent } from './components/system/system.component';
import { provideHttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TrainingTypesComponent } from './components/training-types/training-types.component';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { HomeTrainingTypesComponent } from './components/home/home-training-types/home-training-types.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    HmosComponent,
    OurTeamComponent,
    PaymentOptionsComponent,
    RegistrationFormComponent,
    HomeAboutComponent,
     AboutComponent,
    SystemComponent,   
    HomeAboutComponent, TrainingTypesComponent, HomeTrainingTypesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
