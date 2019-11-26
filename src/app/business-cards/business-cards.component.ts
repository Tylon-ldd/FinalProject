import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../service/data-base.service';
import { BusinessCard } from '../model/business-card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit {

  businessCardList: Observable<any[]>;

  constructor(private databaseService:DataBaseService) { }

  ngOnInit() {

    this.businessCardList = this.databaseService.getBusinessCards()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        //document.data is an iterable object
        //property spread notation:
        //basically builds the properties of this object for you
        return { id, ...data };
      });
    })
    );

  }


  
    

  
  //I believe since we will use a subscribe here
  //that means NgOnDestroy will be needed
  /*
  getList = () => 
    this.database
    .getBusinessCards()
    .subscribe(res =>(this.businessCardList = res));

  */
}
