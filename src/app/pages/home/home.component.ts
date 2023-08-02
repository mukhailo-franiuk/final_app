
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
public count = '0';

ngOnInit(): void {
 setInterval(() =>{
  if(this.count === '0'){
    this.count = '-50%';
  }else if(this.count === '-50%'){
    this.count = '-100%';
  }else if(this.count === '-100%'){
    this.count = '-150%';
  }else if(this.count === '-150%'){
    this.count = '-200%';
  }
 },7000)
}
// slider options
statsPosition(){
  this.count = '0'
}
changeOne() {
  return this.count = `-50%`;
}
changeTwo() {
  return this.count = `-100%`;
}
changeThree() {
  return this.count = `-150%`;
}
changeFour(){
  return this.count = `-200%`;
}

//====================
}
