import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // ייבוא של HttpClientModule

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
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemComponent } from './components/system/system.component';
import { provideHttpClient } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from './components/signature/signature.component';
// import { TruncateTextDirectiveDirective } from './components/about/truncate-text-directive.directive';
// import { TruncateTextDirective } from './components/about/truncate-text.directive';


import { TruncatePipe } from './components/about/truncate.pipe'; // Import your custom pipe
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
    RegistrationFormComponent,  
    HomeAboutComponent,
    SignatureComponent,
    TruncatePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ButtonModule,
    SignaturePadModule

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
