import { Product } from "./product";

export class CartItem {

     id:number;
     name:String;
     image_url:String;
     unitPrice:number;
     quantity:number;


    constructor(product:Product){
        this.id=product.id;
        this.name=product.name;
        this.unitPrice=product.unit_price;
        this.quantity=1;
        this.image_url=product.image_url
    }
}
