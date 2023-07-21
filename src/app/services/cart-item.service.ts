import { Injectable } from '@angular/core';
import { BehaviorSubject, isEmpty, Subject } from 'rxjs';
import { CartItem } from '../Model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
cartItems:CartItem[]=[];
alreadyExisting:boolean=false;

totalPrice:Subject<number>=new BehaviorSubject<number>(0);
totaQuantity:Subject<number>= new BehaviorSubject<number>(0);

  constructor() { 

  }


  addToCart(cartItem:CartItem):void{

  console.log("add to cart service "+ cartItem.name)
  // for (let item of this.cartItems) {
  //   console.log("for loop cartitem"+item.name);
  //   if(item.id==cartItem.id){  
  //     //this item already present in cart
  //     item.quantity++;

  //     console.log("existing cond true"+item.quantity) 
  //     this.alreadyExisting=true;
  //     break;
  //   }

  // }

  this.cartItems.map((item)=>{
    if(item.id==cartItem.id){
      console.log("existing cond true"+item.quantity) ;
      item.quantity++
      this.alreadyExisting=true
    }
  })
  if(!this.alreadyExisting){
    console.log("not existing");
    this.cartItems.push(cartItem);
  }
this.alreadyExisting=false;
this.computeTotals();

  }

removeItem(item:CartItem):void{

let removeIndex=-1;
  this.cartItems.forEach(tempItem=>{
  if(tempItem.id==item.id){
removeIndex=this.cartItems.indexOf(tempItem);
  }
})

this.cartItems.splice(removeIndex,1);
}

  computeTotals():void{


  let price:number=0
  let quantity:number=0;
    for(let item of this.cartItems){
     console.log(item.name);
      let itemPrice=item.quantity* item.unitPrice;
      price+=itemPrice;
      quantity+=item.quantity;
      
    }
    this.totalPrice.next(price);
    this.totaQuantity.next(quantity);

    console.log(`${quantity} "and price" ${price}`)

  }

  decreaseQuantity(item:CartItem):void{

    if(item.quantity==1){
      this.removeItem(item);
    }
    this.cartItems.forEach(tempItem=>{
      if(tempItem.id==item.id){
        tempItem.quantity--;
        this.computeTotals();
      }
    })
  }
}



