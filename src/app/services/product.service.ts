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

  getAllProducts(categoryId:Number,pageNum:number,pageSize:number):Observable<ProductResponse>{

     return this.http.get<ProductResponse>(`${this.baseURL}/getProductByCategory?id=${categoryId}&pageNum=${pageNum}&pageSize=${pageSize}`)
    
     
  }
  findProductByName(keyword:String,pageNum:number,pageSize:number):Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.baseURL}/findProductByName?name=${keyword}&pageNum=${pageNum}&pageSize=${pageSize}`)
  }

  getProductDetails(productId:Number):Observable<Product>{
    this.http.get<Product>(`${this.baseURL}/getProductDetails?id=${productId}`).subscribe(data=> console.log("data"+data.description))
    return this.http.get<Product>(`${this.baseURL}/getProductDetails?id=${productId}`);

   
  }
 

}
interface ProductResponse{
    content:Product[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}