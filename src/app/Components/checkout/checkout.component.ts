import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/Model/cart-item';
import { State } from 'src/app/Model/state';
import { CartItemService } from 'src/app/services/cart-item.service';
import { MyShopFormService } from 'src/app/services/my-shop-form.service';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/Model/address';
import { OrderService } from 'src/app/services/order.service';
import { data } from 'jquery';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutFormGroup:FormGroup;
  cartItems:CartItem[];
  totalPrice:number;
  stateNames:State[];
cardExpDate:string="";
backSpaceOncardExp=false;
isCollapsed:boolean=true;
addresses:Address[]=[];
constructor(private formBuilder:FormBuilder,private cartService:CartItemService,private formServie:MyShopFormService, private orderService
  :OrderService, private userService:UserService, private router:Router){

}

ngOnInit():void{

  this.addresses=this.orderService.addresses;
  this.fetchAllAddress();

  this.userService.checkTokenExpired();
this.userService.isTokenExpired.subscribe(data=>{
  if(data){
    this.router.navigate(['/login']);
  }
})

 this.cartService.cartItems.subscribe(data=>{
  this.cartItems=data;
 });
  this.checkoutFormGroup=this.formBuilder.group({
    newaddress:this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobileNumber:[''],
      street:[''],
      city:[''],
      state:[''],
      PinCode:[''],
    
    })

    

  });

  
this.reviewCartTotals();
  //this.cartService.computeTotals();
 this.formServie.getStates().subscribe(data=>{
  console.log("state data"+data)
  this.stateNames=data;
 });
 //console.log("statenames"+this.stateNames.at(0));
  
  this.checkoutFormGroup.get('creditCard')?.valueChanges.subscribe(data=>{  
    
    console.log("current value"+this.checkoutFormGroup.get('creditCard')?.get('expDate')?.value) 
   // console.log("backspace"+this.backSpaceOncardExp);                                                                               //this method will be called everytime value changes in cardExp. and accordingly wll add a / to cardexp  in mm/yyyy format
    let tempDate:string=this.checkoutFormGroup.get('creditCard')?.get('expDate')?.value
    if(tempDate.length<=2 && !(this.backSpaceOncardExp)){
      tempDate=this.cardValidation(tempDate);
      //tempDate=tempDate+"/";
      console.log("tempDate"+tempDate);
      if(tempDate!=this.checkoutFormGroup.get('creditCard')?.get('expDate')?.value){   //checking if there has been any change of validaton
      this.checkoutFormGroup.get('creditCard')?.get('expDate')?.setValue(tempDate);
      }
      //tempDate="";
    }
    this.backSpaceOncardExp=false;
  //  console.log("made backspace false");
    //tempDate="";
  
   // console.log("exp value"+ this.checkoutFormGroup.get('creditCard')?.get('expDate')?.value);
   
  })
  
 
}

onSubmit():void{

  console.log(this.checkoutFormGroup.get('newaddress')?.value);
  var newAdress: Address = this.checkoutFormGroup.get('newaddress')?.value;
  console.log(newAdress.city);

  this.orderService.addNewAddress(newAdress).subscribe((data)=>{
    console.log("new address"+ data);
    this.fetchAllAddress();
  },(err)=>{
    console.log("error"+err)
  })
}

cardValidation(tempDate:string):string{
  if(tempDate.length==1){
    if(Number(tempDate)>1){
      return '0'+tempDate+'/';
    }
    else
    return tempDate;
  }
  else if(tempDate.length==2){
    if(Number(tempDate)<=12){
      return tempDate+"/";
    }
    else{
      return '0'+tempDate.charAt(0)+'/'+tempDate.charAt(1);
    }
  }


  else if(tempDate.charAt(tempDate.length-1)=='/'){
    return tempDate.slice(0,tempDate.length)
  }
  return "";

}
onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Backspace'&& (this.checkoutFormGroup.get('creditCard')?.get('expDate')?.value.length>0)) { /* if the input field is empty and some dumbass is clicking backspace no need to do anything*/
    console.log('Backspace key pressed');
    this.backSpaceOncardExp=true;
  }
}

radioChecked():void{
  console.log("radio checked");
  this.isCollapsed=true;
}

reviewCartTotals():void{
  this.cartService.totalPrice.subscribe(data=>{
    this.totalPrice=data;
  })
}
fetchAllAddress():void{
    this.orderService.getAllAddress().subscribe(data=>{
      console.log("all adress"+ data.at(0)?.street);
      this.addresses=data;
    })
}
}
