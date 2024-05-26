import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService ,private _Router:Router , private _FormBuilder:FormBuilder){}
  mesError:string=''

  isLoading:boolean=false;

  //by use FormBulider
  loginForm:FormGroup=this._FormBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required, Validators.pattern(/^[A-Za-z1-9_@)]{6,}$/)]],
  })




  login():void{
    this.isLoading=true
 
    const userData=this.loginForm.value;
 
    if(this.loginForm.valid ==true){
     this._AuthService.login(userData).subscribe({
       next:(response)=>{
 
        if(response.message=="success"){
 
         console.log(response)
         localStorage.setItem('token',response.token)

         this._AuthService.decodeUserToken()
         this.isLoading=false;
     //  this._Router.navigate(['/login'])
        }
 
       
       },
       error:(err)=>{
       console.log(err)
       this.mesError=err.error.message;
       this.isLoading=false;
 
       },
       complete:()=>{
               this._Router.navigate(['/home'])


       }
     })
 
    }
 
   
   }

}
