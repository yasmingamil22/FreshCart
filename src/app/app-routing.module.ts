import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [

  //blank
  {path:'',
   loadComponent: ()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
  children:[
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home', loadComponent: ()=>import('./components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
    {path:'cart' ,loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent),title:'Cart' , canActivate:[authGuard]},
    {path:'brand' ,loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent),title:'Brand'},
    {path:'categories' ,loadComponent:()=>import('./components/category/category.component').then((m)=>m.CategoryComponent),title:'Categories'},
    {path:'products' ,loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent),title:'Products'},
    {path:'productdetails/:id' ,loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent),title:'Details'},
    {path:'payment/:id' ,loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent),title:'Payment'},
    {path:'allorders' ,loadComponent:()=>import('./components/order/order.component').then((m)=>m.OrderComponent),title:'AllOrders'},

    
  ]
},
  {path:'',
  loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
  children:[
    {path:'', redirectTo:'login',pathMatch:'full'},
    {path:'login',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:'Login'},
    {path:'register',loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:'Register'},

  ]

  },

 {path:'**',loadComponent:()=>import('./components/not-found/not-found.component').then((m)=>m.NotFoundComponent),title:'Not Found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
