import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prouct-details',
  templateUrl: './prouct-details.component.html',
  styleUrls: ['./prouct-details.component.css']
})
export class ProuctDetailsComponent {
product:Product;


constructor(private productService:ProductService,
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
}
