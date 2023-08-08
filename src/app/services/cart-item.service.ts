import { Injectable } from '@angular/core';
import { BehaviorSubject, isEmpty, map, Observable, Subject } from 'rxjs';
import { CartItem } from '../Model/cart-item';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AddToCartRequest } from '../Model/add-to-cart-request';
import { UserService } from './user.service';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
cartItems:CartItem[]=[];
baseUrl:string="http://localhost:8080/cart"
alreadyExisting:boolean=false;

totalPrice:Subject<number>=new BehaviorSubject<number>(0);
totaQuantity:Subject<number>= new BehaviorSubject<number>(0);

  constructor(private http: HttpClient,private userService:UserService) { 

  }


  addToCart(productId:number):boolean{
    var addtoCartRequest: AddToCartRequest=new AddToCartRequest();
    addtoCartRequest.productId=productId;
    addtoCartRequest.userEmail=this.userService.getUserEmail()!;
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.userService.getToken()
    })
    console.log("add to cart service "+ addtoCartRequest.productId + addtoCartRequest.userEmail
    );
    this.http.post<boolean>(`${this.baseUrl}/addtocart`,addtoCartRequest,{headers:headers}).subscribe(data=>{
      console.log(data);
      return data;
    })
    return false;
  }

  getCartItems():Observable<any>{
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.userService.getToken()
    })

    var userEmail=this.userService.getUserEmail();
    return  this.http.get<any>(`${this.baseUrl}/getcartproducts?userName=${userEmail}`, {headers:headers}).pipe(map((response:any)=>{
      console.log(response)   
      const productList:CartItemsResponse[]=response|| []; 
      return productList.map(item=>{
        return new CartItem(item.product,item.quantity);
      })

     }))
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


interface CartItemsResponse{
  product:Product;
  quantity:number
}


