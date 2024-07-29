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
import { EditingFilesComponent } from './components/PersonalArea/editing-files/editing-files.component';
import { LessonSystemComponent } from './components/PersonalArea/lesson-system/lesson-system.component';
import { PaymentsComponent } from './components/PersonalArea/payments/payments.component';
import { PersonalAreaComponent } from './components/PersonalArea/personal-area/personal-area.component';
import { TabViewModule } from 'primeng/tabview';
import {  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AboutComponent } from './components/about/about.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import {FormsModule} from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemComponent } from './components/system/system.component';
import { provideHttpClient } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

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
    EditingFilesComponent,
    LessonSystemComponent,
    PaymentsComponent,
    PersonalAreaComponent,
    HomeAboutComponent,
     AboutComponent,
    SystemComponent,
    RegistrationFormComponent,  
    HomeAboutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    FormsModule,
    AutoCompleteModule,
    TabViewModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    RadioButtonModule,
    CascadeSelectModule,
    HttpClientModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    // NgbModule,
    ButtonModule

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
