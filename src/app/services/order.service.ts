import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../Model/address';
import { Observable } from 'rxjs';
import { AddNewAddressRequest } from '../Model/add-new-address-request';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL="http://localhost:8080/order"
addresses:Address[]=[];

  constructor(private httpClient:HttpClient, private userService:UserService) { }


  addNewAddress(address:Address):Observable<any>{
     var addNewAddressRequest:AddNewAddressRequest= new AddNewAddressRequest();
    addNewAddressRequest.address=address;
    addNewAddressRequest.email=this.userService.getUserEmail()!;
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.userService.getToken()
    })
    return this.httpClient.post<any>(`${this.baseURL}/addAdress`,addNewAddressRequest,{headers:headers});
  }

  getAllAddress():Observable<Address[]>{
    const headers=new HttpHeaders({
      'Authorization': 'Bearer '+this.userService.getToken()
    })
    var email:string=this.userService.getUserEmail()!;
    return this.httpClient.get<Address[]>(`${this.baseURL}/getAllAddress?userEmail=${email}`,{headers:headers});
  }
}



interface AddAddressRequest{
  address:Address;
  email:String
}


