import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { ICart } from 'src/app/core/interfaces/ICart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart:ICart={} as ICart

  constructor(private _CartService:CartService,private _ToastrService:ToastrService){}

  ngOnInit(): void {
    this.getAllCart()
    
  }

  getAllCart():void{
    this._CartService.getAllCart().subscribe({
      next:(response)=>{
      console.log(response)
      this.cart=response
      },
      error:(err)=>{
       console.log(err)
      },
      complete:()=>{

      }
    })
  }


  
removeCart(id:string):void{
  this._CartService.deleteCart(id).subscribe({
    next:(response)=>{
   this._CartService.numberOfCart.next(response.numOfCartItems)

   this._ToastrService.success(response.status);

   this.cart=response

    },
    error:(err)=>{
      console.log(err)
    }
  })
}

updateCart(id:string,count:number):void{
  if(count>=1){
  this._CartService.updateCart(id,count).subscribe({
    next:(response)=>{

   console.log(response.data)
   this.cart=response
  },
    error:(err)=>{
      console.log(err)
    }
  })
}else if(count==0){
  this.removeCart(id)
}

}

clearCart():void{
  this._CartService.clearCart().subscribe({
    next:(response)=>{
   console.log(response)
   if(response.message=="success"){

    this.cart={} as ICart
    console.log(this.cart)
    this._CartService.numberOfCart.next(0)

   }
    },
    error:(err)=>{
      console.log(err)
    }
  })

}

}
