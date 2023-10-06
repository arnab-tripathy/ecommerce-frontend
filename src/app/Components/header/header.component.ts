import { Component, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemService } from 'src/app/services/cart-item.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 hamStatus:boolean=false;
 isLoggedIn:boolean=false;
 cartItems:number=0;
constructor(public userService: UserService , private router:Router,private cartService: CartItemService){

}

ngOnInit():void{
  this.checkToken();
 this.updateCartervice();

}

updateCartervice():void{

  this.cartService.totaQuantity.subscribe(data=>{
    this.cartItems=data;
  })
  this.cartService.getCartItems();
}

sideNavToggle():void{
  this.hamStatus=!this.hamStatus;
}
loginClicked():void{
  console.log("login clicked");
  if(!this.isLoggedIn){
    console.log("login")
    this.router.navigate(['/login'])
  }
  else{
    this.userService.deleteToken();
    this.userService.checkTokenExpired();
    this.router.navigate(['/'])
  }
}

checkToken():void{

  this.userService.isTokenExpired.subscribe(res=>{
    console.log("login subscrbe"+res)
    this.isLoggedIn=!res;
  })
  this.userService.checkTokenExpired();
}
}


