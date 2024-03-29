import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes , RouterModule } from '@angular/router';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { AppSearchComponent } from './Components/app-search/app-search.component';
import { DummyoneComponent } from './Components/dummyone/dummyone.component';
import { ProuctDetailsComponent } from './Components/prouct-details/prouct-details.component';
import { HeaderComponent } from './Components/header/header.component';

import { AddCartComponent } from './Components/add-cart/add-cart.component';
import { CartDetailsComponent } from './Components/cart-details/cart-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { SignupmodalComponent } from './Components/signupmodal/signupmodal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






const routes:Routes=[
  {path : "dummy", component:DummyoneComponent},
  {path : "search/:keyword", component:ProductListComponent},
  {path: "category/:id" , component: ProductListComponent},
  {path: "products" , component: ProductListComponent},
  {path: "category" , component: ProductListComponent},
  {path:"product/:id", component: ProuctDetailsComponent},
  {path:"cart",component:CartDetailsComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"login",component:LoginComponentComponent},
  {path: "" , redirectTo:"/products" ,pathMatch:'full'},
 
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent,
    AppSearchComponent,
    DummyoneComponent,
    ProuctDetailsComponent,
    HeaderComponent,
    AddCartComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponentComponent,
    SignupmodalComponent

  
  ],
  imports: [

    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
