import { Component, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 hamStatus:boolean=false;
 isLoggedIn:boolean=false;
constructor(public userService: UserService , private router:Router){

}

ngOnInit():void{
  this.checkToken();
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


