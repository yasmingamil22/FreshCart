import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit{
  isLoggedIn:boolean=false
  countProducts:number=0;


  constructor(private _Router:Router,private _CartService:CartService){}
  ngOnInit(): void {
    this.loggedIn()
    this.getNumberInCart()
  }

  singnOut():void{
    localStorage.removeItem('token')
    this._Router.navigate(['/login'])
  }


  loggedIn():void{
    if(localStorage.getItem('token') !=null){
      this.isLoggedIn=true

    }else{
      this.isLoggedIn=false
    }

  }

  getNumberInCart():void{

    this._CartService.numberOfCart.subscribe({
      next:(val)=>{
        this.countProducts=val
      },
      error:(err)=>{
        console.log(err)
      }
    })

    this._CartService.getAllCart().subscribe({
      next:(response)=>{
     console.log(response)
     this.countProducts=response.numOfCartItems;
      },
      error:(err)=>{
        console.log(err)
      }
    })  

  }

}
