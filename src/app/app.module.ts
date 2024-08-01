import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // ייבוא של HttpClientModule
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { HmosComponent } from './components/hmos/hmos.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { EditingFilesComponent } from './components/PersonalArea/editing-files/editing-files.component';
import { LessonSystemComponent } from './components/PersonalArea/lesson-system/lesson-system.component';
import { PaymentsComponent } from './components/PersonalArea/payments/payments.component';
import { PersonalAreaComponent } from './components/PersonalArea/personal-area/personal-area.component';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RegistrationComponent } from './components/registration/registration.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AboutComponent } from './components/about/about.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import {FormsModule} from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemComponent } from './components/system/system.component';
import { provideHttpClient } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { SubscriptionBenefitsComponent } from './components/subscription-benefits/subscription-benefits.component';
import { HomeSubscriptionBenefitsComponent } from './components/home/home-subscription-benefits/home-subscription-benefits.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    HmosComponent,
    OurTeamComponent,
    PaymentOptionsComponent,
    EditingFilesComponent,
    LessonSystemComponent,
    PaymentsComponent,
    PersonalAreaComponent,
    HomeAboutComponent,
    RegistrationComponent,
    HomeAboutComponent,
    AboutComponent,
    SystemComponent,
    SubscriptionBenefitsComponent,
    HomeSubscriptionBenefitsComponent
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
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    // NgbModule,
    ButtonModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
