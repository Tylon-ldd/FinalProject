import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../service/data-base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: "new-business-card",
  templateUrl: "./new-business-card.component.html",
  styleUrls: ["./new-business-card.component.css"]
})
export class NewBusinessCardComponent implements OnInit {
  cardForm: FormGroup;

  constructor(
    private dataBaseService: DataBaseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: [""],
      info: [""]
    });
  }

  onSubmit() {
    if (!this.cardForm.invalid) {
      const card = this.cardForm.value;
      this.dataBaseService
        .createBusinessCard(card)
        .then(res => {
          console.log("New Card added to database");
          console.log(res);
          this.router.navigate(["/list"]);
        })
        .catch(err => {
          console.log("Something went wrong");
          console.log(err);
        });
    }
  }
}
