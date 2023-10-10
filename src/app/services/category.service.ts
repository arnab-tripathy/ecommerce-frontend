import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryList:Category[]

  baseURL="https://ecommerce-project-backend-production.up.railway.app/products/getAllCategory"
  constructor(public httpClient: HttpClient) { }


  getAllCategory():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.baseURL)
  }

}
