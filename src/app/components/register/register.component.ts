import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/interfaces/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService ,private _Router:Router , private _FormBuilder:FormBuilder){}
  mesError:string=''

  isLoading:boolean=false;

  //by use FormBulider
  registerForm:FormGroup=this._FormBuilder.group({
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required, Validators.pattern(/^[A-Za-z1-9_@)]{6,}$/)]],
    rePassword:[''],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][1-9]{8}$/)]],
  }, {validators:[this.confirmPassword] } as FormControlOptions)

  /*
  registerForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z1-9_@)]{6,}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][1-9]{8}$/)]),
  } , {validators:[this.confirmPassword] } as FormControlOptions)

*/
  confirmPassword(group:FormGroup):void{
    const password=group.get('password')
    const rePassword=group.get('rePassword')

    if(rePassword?.value==''){
      rePassword?.setErrors({required:true})   
    }
    else if(password?.value !=rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }

  handleForm():void{
   // console.log(this.registerForm.value)
   this.isLoading=true

   const newUser=this.registerForm.value;

   if(this.registerForm.valid ==true){
    this._AuthService.register(newUser).subscribe({
      next:(response)=>{

       if(response.message=="success"){

        console.log(response)
        this.isLoading=false;
      this._Router.navigate(['/login'])
       }

      
      },
      error:(err)=>{
      console.log(err)
      this.mesError=err.error.message;
      this.isLoading=false;

      }
    })

   }

  
  }

}
