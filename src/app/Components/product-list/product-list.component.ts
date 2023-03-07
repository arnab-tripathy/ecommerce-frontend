import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products:Product[]=[];
  categoryId:Number;


  constructor(private productService:ProductService,
    private route:ActivatedRoute){}
  
  ngOnInit():void{
    this.route.paramMap.subscribe(()=>{
      this.listAllProducts();
    })

    
  }

  listAllProducts(){
 if(this.route.snapshot.routeConfig?.path=='search/:keyword'){
  const searchKeyword=this.route.snapshot.paramMap.get("keyword") ;
 this.handleSearchList(searchKeyword!);
 }
 else{
  this.handleProductList();
 }
  }

  handleProductList():void{
 
    
    const hascat:Boolean=this.route.snapshot.paramMap.has('id')
    //checking if there is any category else the default is 1
    if(hascat){
      console.log("hascat"+this.route.snapshot.paramMap.get('id'))
      this.categoryId= Number(this.route.snapshot.paramMap.get('id'))
    }
    else{
      this.categoryId=1;
    }

    this.productService.getAllProducts(this.categoryId).subscribe(data=>{
      console.log("getAllPrdoucts"+data)
       this.products=data.content;
    })
  }

  handleSearchList(keyword:String):void{
    this.productService.findProductByName(keyword).subscribe(data=>{
      this.products=data.content;
    })
  }
}
