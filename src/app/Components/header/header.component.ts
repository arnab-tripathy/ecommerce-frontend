import { Component, Output , EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
@Output() sideNavtoggled=new EventEmitter<boolean>();

 hamStatus:boolean=false;
constructor(){

}

sideNavToggle():void{
  this.hamStatus=!this.hamStatus;
  this.sideNavtoggled.emit(this.hamStatus);
}

}
