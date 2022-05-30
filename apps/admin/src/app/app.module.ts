import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '@tejb/products';
import { ProductsListComponent } from './products/product-list/product-list.component';
import { ProductsFormComponent } from './products/product-form/products-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AuthGuardService, JwtIntercepterInterceptor, UsersModule, UsersService, RoleGuardGuard } from '@tejb/users';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate:[AuthGuardService, RoleGuardGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'Categories',
        component: CategoriesListComponent,
      },
      {
        path: 'Categories/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'orders/:id',
        component: OrdersDetailsComponent
      }
    ],
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    UsersModule,
    NgxStripeModule.forRoot('pk_test_51KzHLhSF0RHvnjsw3FjpDEHDT8w2h4i0wE0YIcwMQysUu6xcC5U2cnysGkKvkd3nIF74slu06nGUbZ2uggrsM8a500oxfdHP44')

  ],
  providers: [CategoriesService, UsersService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtIntercepterInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
