import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.css']
})
export class AppSearchComponent {
  constructor(private router:Router){

  }
  

  searchProducts(keyword:String):void{
    console.log("search for"+keyword);
    if(keyword.length>=1)
  this.router.navigateByUrl(`/search/${keyword}`)

  }
}
