import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Category, IProduct } from 'src/app/core/interfaces/iproduct';
import { CustomCurrencyEgpPipe } from 'src/app/core/pipes/custom-currency-egp.pipe';
import { TextCuttingPipe } from 'src/app/core/pipes/text-cutting.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CustomCurrencyEgpPipe,TextCuttingPipe,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  productList:IProduct[]=[];
  categoryList:Category[]=[];

  constructor(
    private _ProductService:ProductService,
    private _Router:Router,
    private _CartService:CartService,
    private _ToastrService:ToastrService){}

  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next:(response)=>{

      this.productList=response.data
      },
      error:(err)=>{
       console.log(err)
      }
    })

  
  this._ProductService.getAllCategories().subscribe({
    next:(response)=>{
    console.log(response)

    this.categoryList=response.data
    },
    error:(err)=>{
     console.log(err)
    }
  })

  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1350:{
        items:6
      }
    },
    nav: false
  }

  mainSlidOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1000,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }


  addToCart(id:string):void{
    let msg=''

    if(localStorage.getItem('token') !=null){
      this._CartService.addToCart(id).subscribe({
        next:(response)=>{
        console.log(response)
        msg=response.message
        this._CartService.numberOfCart.next(response.numOfCartItems)

        },
        error:(err)=>{
         console.log(err)
        },
        complete:()=>{
          this._ToastrService.success(msg)

        }
      })


    }else{
     this._Router.navigate(['/login'])
    }

  }

}
