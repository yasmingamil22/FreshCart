import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts(pageNum:number=1,limit:number):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products?page=${pageNum}&limit=${limit}`)
  }
  getAllCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl+"categories")
  }

  getProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products/${id}`)
  }


}
