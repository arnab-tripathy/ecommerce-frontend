import { Component } from '@angular/core';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent {

totalPrice:number=0;
totalQuantity:number=0;

constructor(private cartService: CartItemService){

}

ngOnInit():void{
this.updateCartStatus();
}
updateCartStatus():void{
this.cartService.totaQuantity.subscribe(data=>{
  this.totalPrice=data;
})
this.cartService.totalPrice.subscribe(data=>{
  this.totalQuantity=data;
})
}

}
