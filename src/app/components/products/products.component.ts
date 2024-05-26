import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/core/interfaces/iproduct';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CustomCurrencyEgpPipe } from 'src/app/core/pipes/custom-currency-egp.pipe';
import { TextCuttingPipe } from 'src/app/core/pipes/text-cutting.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,CustomCurrencyEgpPipe,TextCuttingPipe,RouterLink,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  productList:IProduct[]=[];

  pageSize:number=0
  currentPage:number=1
  total:number=0

  constructor(
    private _ProductService:ProductService,
    private _Router:Router,
    private _CartService:CartService,
    private _ToastrService:ToastrService){}

  ngOnInit(): void {
  
this.getAllProduct(1)

  }

  getAllProduct(numberPage:number):void{
    this._ProductService.getAllProducts(numberPage,20).subscribe({
      next:(response)=>{

      this.productList=response.data
      this.pageSize=response.metadata.limit
      this.currentPage=response.metadata.currentPage
      this.total=response.results  
      },
      error:(err)=>{
       console.log(err)
      }
    })

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


  pageChanged(event:any){
    console.log(event)

    this.getAllProduct(event)

  }

}
