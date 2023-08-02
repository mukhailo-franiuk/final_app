import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { SharedComponent } from './pages/shared/shared.component';
import { RoliComponent } from './pages/roli/roli.component';
import { SetsComponent } from './pages/sets/sets.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { SauceComponent } from './pages/sauce/sauce.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { AdminComponent } from './admin/admin.component';
import { AdminSharedComponent } from './admin/admin.shared/admin.shared.component';
import { AdminCategoryComponent } from './admin/admin.category/admin.category.component';
import { AdminProductsComponent } from './admin/admin.products/admin.products.component';
import { AdminOrderComponent } from './admin/admin.order/admin.order.component';

const routes: Routes = [
  {path:'',component:HomeComponent,title:'Monosushi'},
  {path:'shareds',component:SharedComponent,title:'Акції - Monosushi'},
  {path:'rols',component:RoliComponent,title:'Роли - Monosushi'},
  {path:'sets',component:SetsComponent,title:'Сети - Monosushi'},
  {path:'drinks',component:DrinksComponent,title:'Напої - Monosushi'},
  {path:'sauces',component:SauceComponent,title:'Соуси - Monosushi'},
  {path:'delivery',component:DeliveryComponent,title:'Доставка та оплата - Monosushi'},
  {path:'about',component:AboutComponent,title:'Про нас - Monosushi'},
  {path:'oferta',component:OfertaComponent,title:'Оферта - Monosushi'},
  {path: 'admin',component:AdminComponent,title:'Admin panel monosushi',children:[
    {path:'shared',component:AdminSharedComponent},
    {path:'category',component:AdminCategoryComponent},
    {path:'products',component:AdminProductsComponent},
    {path:'order',component:AdminOrderComponent},
    {path:'',pathMatch:'full',redirectTo:'shared'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
