import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedRequest, SharedResponse } from 'src/app/options/interfaces/interface';
import { SharedService } from 'src/app/options/services/shared/shared.service';

@Component({
  selector: 'app-shared-info',
  templateUrl: './shared-info.component.html',
  styleUrls: ['./shared-info.component.scss']
})
export class SharedInfoComponent {
  public shared!:SharedRequest;

  constructor(
   private sharedService:SharedService,
   private activateRoute:ActivatedRoute
  ){}

ngOnInit(): void {
  this.getOneDShared();
}

  getOneDShared(): void {
    const SHARED_ID = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.sharedService.getOne(SHARED_ID).subscribe(data =>{
      this.shared = data;
    })
  }
}
