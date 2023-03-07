import { Component } from '@angular/core';
import { Category } from 'src/app/Model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  categories:Category[]
constructor(public categoryService:CategoryService){

}

  ngOnInit():void{
  this.listAllCategory();
  }

  listAllCategory(){
this.categoryService.getAllCategory().subscribe(data=>{
  this.categories=data;
})
  }
}
 

