import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public showModalMenu = false;
constructor(){}
ngOnInit(): void {
 
}
showMenuModal():void {
this.showModalMenu = true;
}
closeMenuModal():void {
  this.showModalMenu = false;
}
}
