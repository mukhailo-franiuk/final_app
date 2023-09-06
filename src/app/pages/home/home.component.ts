
import { Component } from '@angular/core';
import { ProductResponse } from 'src/app/options/interfaces/interface';
import { ProductsService } from 'src/app/options/services/products/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

public adminProducts:Array<ProductResponse> = [];
public count = '0';
public style = `
border-top: 4px solid #b5d8f7;
                    border-left: none;
                    border-right: none;
                    border-bottom: none;
`
public style1 = '';
public style2 = '';
public style3 = '';
public style4 = '';
public style5 = '';
public style6 = '';
public style7 = '';

constructor(
  private productService:ProductsService
){}

ngOnInit(): void {
  this.allProductsList();
  this.style1 = this.style;
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

allProductsList():void {
  this.productService.getAll().subscribe(data => {
    this.adminProducts = data;
    
  })
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
allProducts():void {
  this.style1 = this.style;
  this.style2 = '';
  this.style3 = '';
  this.style4 = '';
  this.style5 = '';
  this.style6 = '';
  this.style7 = '';
}

oneBlock():void {
  this.style1 = '';
  this.style2 = this.style;
  this.style3 = '';
  this.style4 = '';
  this.style5 = '';
  this.style6 = '';
  this.style7 = '';
}
twoBlock():void {
  this.style1 = '';
  this.style2 = '';
  this.style3 = this.style;
  this.style4 = '';
  this.style5 = '';
  this.style6 = '';
  this.style7 = '';
}
threeBlock():void {
  this.style1 = '';
  this.style2 = '';
  this.style3 = '';
  this.style4 = this.style;
  this.style5 = '';
  this.style6 = '';
  this.style7 = '';
}
fourBlock():void {
  this.style1 = '';
  this.style2 = '';
  this.style3 = '';
  this.style4 = '';
  this.style5 = this.style;
  this.style6 = '';
  this.style7 = '';
}
fiveBlock():void {
  this.style1 = '';
  this.style2 = '';
  this.style3 = '';
  this.style4 = '';
  this.style5 = '';
  this.style6 = this.style;
  this.style7 = '';
}
sixBlock():void {
  this.style1 = '';
  this.style2 = '';
  this.style3 = '';
  this.style4 = '';
  this.style5 = '';
  this.style6 = '';
  this.style7 = this.style;
}
}
