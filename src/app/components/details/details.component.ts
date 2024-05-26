import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CustomCurrencyEgpPipe } from 'src/app/core/pipes/custom-currency-egp.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule,CustomCurrencyEgpPipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router,
    private _ProductService:ProductService,
    private _CartService:CartService,
    private _ToastrService:ToastrService){}
    
  productId!:any
  productDetails!:IProduct

  imagesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  
    nav: false
  }

  ngOnInit(): void {
   this.getIdFromUrl()
   this.getProductById()
  }

  getIdFromUrl():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.productId= params.get('id')
       console.log(this.productId)
      }
    })
  }

  getProductById():void{
    this._ProductService.getProductDetails(this.productId).subscribe({
      next:({data})=>{
        console.log(data)
        this.productDetails=data
       },
      error:(err)=>{
        console.log(err)
      }
    })

  }

    addToCart():void{
      let msg=''
  
      if(localStorage.getItem('token') !=null){
        this._CartService.addToCart(this.productId).subscribe({
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
