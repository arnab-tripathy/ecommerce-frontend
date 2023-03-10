import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productlist:Product[];
  baseURL="http://localhost:8080/products"
  constructor(private http:HttpClient) { }

  getAllProducts(categoryId:Number):Observable<ProductResponse>{

     return this.http.get<ProductResponse>(`${this.baseURL}/getProductByCategory?id=${categoryId}`)
    
     
  }
  findProductByName(keyword:String):Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.baseURL}/findProductByName?name=${keyword}`)
  }

  getProductDetails(productId:Number):Observable<Product>{
    this.http.get<Product>(`${this.baseURL}/getProductDetails?id=${productId}`).subscribe(data=> console.log("data"+data.description))
    return this.http.get<Product>(`${this.baseURL}/getProductDetails?id=${productId}`);

   
  }

}
interface ProductResponse{
    content:Product[];
}