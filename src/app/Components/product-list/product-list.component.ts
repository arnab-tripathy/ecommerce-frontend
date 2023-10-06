import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/Model/cart-item';
import { Product } from 'src/app/Model/product';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products:Product[]=[];
  categoryId:Number;
  totalElements: number;
  previousCategoryId:Number=1;
  totalPages: number;
  size: number=5;
  pageNumber: number=1;
  


  constructor(private productService:ProductService, private cartSrvice:CartItemService,private userService:UserService,
    private route:ActivatedRoute,private router:Router){}
  
  ngOnInit():void{
    this.route.paramMap.subscribe(()=>{
      this.listAllProducts();
    })

    
  }

  listAllProducts(){
    console.log("list all")
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


    //check if the current category id is same , else we have to start from page 1(in the url smeone may change the category id)

    if(this.previousCategoryId!=this.categoryId){
      this.pageNumber=1;
    }
    this.previousCategoryId=this.categoryId;

    this.productService.getAllProducts(this.categoryId,this.pageNumber-1,this.size).subscribe(data=>{
      console.log("getAllPrdoucts"+data)
      this.processResult(data);
    
    })
  }
private processResult(data:any){
  this.products=data.content;
  this.totalElements=data.totalElements;
  this.totalPages=data.totalElements;
  this.pageNumber=data.number+1;
}
  handleSearchList(keyword:String):void{
    this.productService.findProductByName(keyword,this.pageNumber-1,this.size).subscribe(data=>{
    this.processResult(data);
    })
  }


  addToCart(productId:number):void{

  this.userService.isTokenExpired.subscribe(res=>{
    if(!res){
      this.cartSrvice.addToCart(productId);

      document.getElementById("loginBadge"+productId)!.style.display ="flex"
setTimeout(()=>{
  
  document.getElementById("loginBadge"+productId)!.style.display ="none";
  
},1000)

document.getElementById("addtocart"+productId)!.innerHTML="Added to cart";
const button=document.getElementById("addtocart"+productId)!;
button.setAttribute("disabled","disabled");
    }
    else{
      this.router.navigate(['/login']);
    }
  })
      
  }
}
