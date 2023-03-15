import { Product } from "./product";

export class CartItem {

     id:number;
     name:String;
     imageUrl:String;
     unitPrice:number;
     quantity:number;


    constructor(product:Product){
        this.id=product.id;
        this.name=product.name;
        this.unitPrice=product.unit_price;
        this.quantity=1;
    }
}
