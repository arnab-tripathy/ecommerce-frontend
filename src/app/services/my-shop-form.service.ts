import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { State } from '../Model/state';


@Injectable({
  providedIn: 'root'
})
export class MyShopFormService {

  constructor(private httpClient:HttpClient) { }


  getStates(): Observable<State[]>{
    console.log("in gtstates")

// console.log(states.at(0));
//     console.log(JSON.parse(JSON.stringify(statedata)));
//      return JSON.parse(JSON.stringify(statedata)) as State[];
return this.httpClient
      .get<State[]>('../../assets/Statenames.json')
      .pipe(map((response: State[]) => response));

  }
}


interface state{

}
