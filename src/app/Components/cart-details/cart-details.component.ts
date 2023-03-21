import { Component } from '@angular/core';
import { CartItem } from 'src/app/Model/cart-item';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  cartItems:CartItem[];
  totalPrice:number=0;

  constructor(private cartService:CartItemService){

  }

  ngOnInit():void{
    this.listCartDetails()
  }

  listCartDetails():void{
this.cartItems=this.cartService.cartItems;

this.cartService.totalPrice.subscribe(data=>{
  this.totalPrice=data;
})

this.cartService.computeTotals();
console.log(this.cartItems.at(0)?.image_url)



  }

  increaseQuantity(item:CartItem):void{
    this.cartService.addToCart(item);
  }
  decreaseQuantity(item:CartItem):void{
    this.cartService.decreaseQuantity(item);
  }

  remove(item:CartItem):void{
    this.cartService.removeItem(item);
  }
}
