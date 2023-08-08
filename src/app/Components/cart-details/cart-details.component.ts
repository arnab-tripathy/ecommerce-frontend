import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from 'src/app/Model/cart-item';
import { CartItemService } from 'src/app/services/cart-item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  cartItems:CartItem[];
  totalPrice:number=0;

  constructor(private cartService:CartItemService,private userService:UserService,
     private router:Router){

  }

  ngOnInit():void{
    this.listCartDetails()
  }

  listCartDetails():void{
   this.cartService.getCartItems().subscribe(data=>{
    this.cartService.cartItems=data;
    this.cartItems=this.cartService.cartItems;
  this.cartService.computeTotals();
   });

   this.cartService.totalPrice.subscribe(data=>{
    this.totalPrice=data;
   })
  }
  remove(item:CartItem):void{
    this.cartService.removeItem(item);
  }

  checkoutClicked():void{
   this.userService.checkTokenExpired();
   this.userService.isTokenExpired.subscribe(res=>{
    if(res){
      this.router.navigate(['/login']);

    }
    else{
      this.router.navigate(['/checkout'])
    }
   }) 
   
  }

  calculateTotalPrice():void{
    for(let item of this.cartItems){
      this.totalPrice+= item.quantity+item.unitPrice;
    }
  }
}
