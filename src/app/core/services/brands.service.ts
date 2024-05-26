import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'


  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(pageNumber: number=1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}brands?page=${pageNumber}`);
  }

}
