import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  constructor(
    private _FormBuilder:FormBuilder ,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService){}

  checkout:FormGroup=this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: ['']

  })

  cartId:any=''

  ngOnInit(): void {
    this.getCartId()
  }


   handleForm():void {
    console.log(this.checkout.value)

    this._CartService.checkOut(this.cartId,this.checkout.value).subscribe({
      next:(response)=>{
        if(response.status=='success'){
          window.open(response.session.url,'_self')
        }
       console.log(response.session.url)
      }
    })
  }
  getCartId():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
          console.log(params.get('id'));
          this.cartId=params.get('id');
      }
    })

  }

}
