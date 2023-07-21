import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/Model/cart-item';
import { State } from 'src/app/Model/state';
import { CartItemService } from 'src/app/services/cart-item.service';
import { MyShopFormService } from 'src/app/services/my-shop-form.service';


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
constructor(private formBuilder:FormBuilder,private cartService:CartItemService,private formServie:MyShopFormService){

}

ngOnInit():void{

  this.cartItems=this.cartService.cartItems;
  this.checkoutFormGroup=this.formBuilder.group({
    customer:this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:['']
    }),
    shippingAddress:this.formBuilder.group({
      street:[''],
      city:[''],
      state:[''],
      PinCode:[''],
    
    }),
    creditCard: this.formBuilder.group({
      cardType: [''],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      expDate:['']
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
  console.log(this.checkoutFormGroup.get('customer')?.value);
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

reviewCartTotals():void{
  this.cartService.totalPrice.subscribe(data=>{
    this.totalPrice=data;
  })
}

}
