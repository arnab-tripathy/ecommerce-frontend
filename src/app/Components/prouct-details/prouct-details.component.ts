import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/Model/cart-item';
import { Product } from 'src/app/Model/product';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prouct-details',
  templateUrl: './prouct-details.component.html',
  styleUrls: ['./prouct-details.component.css']
})
export class ProuctDetailsComponent {
product:Product;


constructor(private productService:ProductService,private cartService:CartItemService,
  private route:ActivatedRoute){

  }
ngOnInit():void{
this.route.paramMap.subscribe(()=>{
  this.loadProductDetails();
})
}
loadProductDetails():void{

  const productId:number =Number(this.route.snapshot.paramMap.get("id"));
  this.productService.getProductDetails(productId).subscribe(data=>{

    console.log("product"+data.name)
    this.product=data;
  })


}

addToCart(product:Product):void{
this.cartService.addToCart(product.id)

}
}
