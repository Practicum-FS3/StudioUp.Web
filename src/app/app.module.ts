import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { HmosComponent } from './components/hmos/hmos.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AboutComponent } from './components/about/about.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemComponent } from './components/system/system.component';
import { provideHttpClient } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
<<<<<<< HEAD
import { ContactComponent } from './components/contact/contact.component';
=======
import { AfterRegistrationComponent } from './components/after-registration/after-registration.component';
import { StoreModule } from '@ngrx/store';
import { registrationReducer } from './store/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SubscriptionBenefitsComponent } from './components/subscription-benefits/subscription-benefits.component';
import { HomeSubscriptionBenefitsComponent } from './components/home/home-subscription-benefits/home-subscription-benefits.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { TooltipModule } from 'primeng/tooltip';
import { HomeComponent } from './components/home/home.component';
import { CustomerSubHistoryComponent } from './components/customer-sub-history/customer-sub-history.component';
import { SubscriptionDetailComponent } from './components/customer-sub-history/subscription-detail/subscription-detail.component';
>>>>>>> 0ac5439910b6aa86074059e0360e2b9c5d69bede

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    HmosComponent,
    OurTeamComponent,
    PaymentOptionsComponent,
    HomeAboutComponent,
<<<<<<< HEAD
     AboutComponent,
    SystemComponent,   
    HomeAboutComponent, 
    
=======
    RegistrationComponent,
    HomeAboutComponent,
    AboutComponent,
    SystemComponent,
    HomeAboutComponent,
    AfterRegistrationComponent,    
    SubscriptionBenefitsComponent,
    HomeSubscriptionBenefitsComponent,
    TracksComponent,
    HomeComponent,
    CustomerSubHistoryComponent,
    SubscriptionDetailComponent
>>>>>>> 0ac5439910b6aa86074059e0360e2b9c5d69bede
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ButtonModule,
<<<<<<< HEAD
    ContactComponent,
=======
    StoreModule.forRoot({ registration: registrationReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
>>>>>>> 0ac5439910b6aa86074059e0360e2b9c5d69bede
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
