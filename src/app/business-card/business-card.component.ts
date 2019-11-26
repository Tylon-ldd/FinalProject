import { Component, Input } from "@angular/core";
import { BusinessCard } from "../model/business-card";
import { DataBaseService } from "../service/data-base.service";
import { Router } from '@angular/router';

@Component({
  selector: "business-card",
  templateUrl: "./business-card.component.html",
  styleUrls: ["./business-card.component.css"]
})
export class BusinessCardComponent {
  @Input() bCard: BusinessCard;
  @Input() i: number;

  bEdit = false;
  constructor(
    private dataBaseService: DataBaseService,
    private router: Router
  ) {}

  editCard() {
    this.router.navigate([`/editCard/${this.bCard.id}`]);
  }

  deleteCard() {
    this.dataBaseService
      .deleteBusinessCard(this.bCard.id)
      .then(res => {
        console.log("Card deleted");
        console.log(res);
      })

      .catch(err => {
        console.log("Something went wrong");
        console.log(err);
      });
  }
}
