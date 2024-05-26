import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberOfCart=new BehaviorSubject(0);
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'

  constructor(private _HttpClient:HttpClient) { }

  myToken:any={
    token:localStorage.getItem('token')

  }

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl+"cart",
    {
      productId:id
    },
      {
        headers:this.myToken
      }
    )
  }

  getAllCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl+"cart",
      {
        headers:this.myToken
      }
    )
  }


  deleteCart(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + "cart/" + id,
      {
        headers:this.myToken
      }
   )
  }

  updateCart(id:string,count:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + "cart/" +id,
    { count: count},
    {
      headers:this.myToken
    }
   )
  }


  checkOut(cartId:string,userData:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress:userData
    },
    {
      headers:this.myToken
    }

    )
  }


  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl+"cart",
    {
      headers:this.myToken
    }
  )
  }

}
