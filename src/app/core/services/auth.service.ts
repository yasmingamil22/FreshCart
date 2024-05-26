import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo:any;

  baseUrl:string='https://ecommerce.routemisr.com/api/v1/auth/'
  constructor(private _HttpClient:HttpClient) { }

  register(newUser:IUser):Observable<any>{
   return this._HttpClient.post(this.baseUrl +'signup',newUser,)
  }

  login(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +'signin',userData,)
   }


   decodeUserToken():void{

    const encodeToken=localStorage.getItem('token');
    if(encodeToken !=null){
      const decode=jwtDecode(encodeToken);
     this.userInfo=decode;
     console.log(decode)
    }

  }


}
