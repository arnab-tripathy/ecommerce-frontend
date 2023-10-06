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
cartItems:Subject<CartItem[]>=new BehaviorSubject<CartItem[]>([]);
baseUrl:string="http://localhost:8080/cart"
alreadyExisting:boolean=false;

totalPrice:Subject<number>=new BehaviorSubject<number>(0);
totaQuantity:Subject<number>= new BehaviorSubject<number>(0);


  constructor(private http: HttpClient,private userService:UserService) { 

  }


  addToCart(productId:number):boolean{

    console.log("add to cart called");
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
      this.getCartItems();
      return data;
    })

   
    return false;
  }

  getCartItems():void{

    console.log("get cart items called");
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.userService.getToken()
    })

    var userEmail=this.userService.getUserEmail();
  // this.http.get<CartItemsResponse[]>(`${this.baseUrl}/getcartproducts?userName=${userEmail}`,{headers:headers}).subscribe(data=>{
  //   console.log(data);

  //   console.log("cartitems"+ this.cartItems);
  //   this.totaQuantity.next(data.length);
  // })

  this.http.get<any>(`${this.baseUrl}/getcartproducts?userName=${userEmail}`,{headers:headers}).pipe(map((response:any)=>{
    console.log(response)   
    const productList:CartItemsResponse[]=response|| []; 
    return productList.map(item=>{
      return new CartItem(item.product,item.quantity);
    })
  })).subscribe(data=>{
      console.log("cartItems"+ data.at(0)?.name)
      this.cartItems.next(data);
      this.totaQuantity.next(data.length);
      this.computeTotals();
  })

  }

removeItem(item:CartItem):Observable<boolean>{
  var userEmail:string="";
  userEmail= this.userService.getUserEmail()!;

  console.log("userEmail"+ userEmail);
  const headers=new HttpHeaders({
    'Authorization': 'Bearer '+this.userService.getToken()
  })
return this.http.delete<boolean>(`${this.baseUrl}/deletefromcart?prodductId=${item.id}&userEmail= ${userEmail}`,{headers:headers});


}

  computeTotals():void{



    this.cartItems.subscribe(data=>{
      let price=0;

        data.forEach(item=>{
          price+=item.quantity * item.unitPrice;
        })
        this.totalPrice.next(price);
    })

  
  // let price:number=0
  // let quantity:number=0;
  //   for(let item of this.cartItems){
  //    console.log(item.name);
  //     let itemPrice=item.quantity* item.unitPrice;
  //     price+=itemPrice;
  //     quantity+=item.quantity;
      
  //   }
  //   this.totalPrice.next(price);
  //   this.totaQuantity.next(quantity);

  //   console.log(`${quantity} "and price" ${price}`)

  }

  decreaseQuantity(item:CartItem):void{

   
  }
}


interface CartItemsResponse{
  product:Product;
  quantity:number
}


