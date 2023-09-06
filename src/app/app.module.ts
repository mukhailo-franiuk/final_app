import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'  //HTTP request
import { ReactiveFormsModule } from '@angular/forms';  //Reactive forms

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './static/header/header.component';
import { FooterComponent } from './static/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedComponent } from './pages/shared/shared.component';
import { RoliComponent } from './pages/roli/roli.component';
import { SetsComponent } from './pages/sets/sets.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { SauceComponent } from './pages/sauce/sauce.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { SharedInfoComponent } from './pages/shared-info/shared-info.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSharedComponent } from './admin/admin.shared/admin.shared.component';
import { AdminCategoryComponent } from './admin/admin.category/admin.category.component';
import { AdminProductsComponent } from './admin/admin.products/admin.products.component';
import { AdminOrderComponent } from './admin/admin.order/admin.order.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SharedComponent,
    RoliComponent,
    SetsComponent,
    DrinksComponent,
    SauceComponent,
    DeliveryComponent,
    AboutComponent,
    AdminComponent,
    AdminSharedComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminOrderComponent,
    OfertaComponent,
    SharedInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
