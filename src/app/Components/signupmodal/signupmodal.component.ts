import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupmodal',
  templateUrl: './signupmodal.component.html',
  styleUrls: ['./signupmodal.component.css']
})
export class SignupmodalComponent {

  @Input() source="";

  constructor(private router:Router){

  }

  continueClick():void{
    this.router.navigate(['/products'])
  }
}
