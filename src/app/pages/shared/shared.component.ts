import { Component } from '@angular/core';
import { SharedResponse } from 'src/app/options/interfaces/interface';
import { SharedService } from 'src/app/options/services/shared/shared.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent {
public sharedAll:Array<SharedResponse > = []

constructor(private servicesShared:SharedService){}

ngOnInit(): void {
 this.showService();
}
showService():void{
  this.servicesShared.getAll().subscribe(data => {
    this.sharedAll = data;
  })
}
}
