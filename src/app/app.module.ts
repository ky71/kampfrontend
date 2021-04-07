import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http' //bunu http istekleri yapabilmek için yazmamız gerekiyor
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarimageComponent } from './components/carimage/carimage.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import{ToastrModule} from "ngx-toastr";
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarimageComponent,
    VatAddedPipe,
    FilterPipePipe,
    BrandPipePipe,
    ColorPipePipe,
    CartSummaryComponent,
    CarFilterComponent,
    CreditCardComponent,
    RegisterComponent,
    ProfileComponent,
    PaymentComponent,
    CarAddComponent,
    LoginComponent,
    FooterComponent,
    CarUpdateComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,    //bunuda ekledik
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    
    NgbModule,
    
    
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
      
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }