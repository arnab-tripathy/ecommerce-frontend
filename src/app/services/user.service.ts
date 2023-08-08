import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/user';
import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../Model/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User;

  constructor(private http:HttpClient) { }

  baseUrl:string="http://localhost:8080/users"

  isTokenExpired:Subject<boolean>=new BehaviorSubject<boolean>(true);


 signupUser(user:User):Observable<UserSignupResponse>{
      return this.http.post<UserSignupResponse>(`${this.baseUrl}/signup`,user);
   
  }

  loginUser(loginRequest:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`,loginRequest);
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken():string | null{
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }
  checkTokenExpired(){
    const helper= new JwtHelperService();
    const token= this.getToken();
    if(token!=null){
      this.isTokenExpired.next(helper.isTokenExpired(token));
    }
    else{
      this.isTokenExpired.next(true);
    }
  
  }

  setUserName(userEmail:string):void{
    localStorage.setItem('userEmail',userEmail);
  }

  getUserEmail():string | null{
    return localStorage.getItem('email')
  }
  removeUserEmail():void{
    localStorage.removeItem('userEmail');
  }

}

interface UserSignupResponse{
  user:User;
  statusCode:HttpStatusCode;
  token:string;
  failureReason:string;
}


interface LoginResponse{
  jwtToken:string;
  username:string;
  userEmail:string;
}
