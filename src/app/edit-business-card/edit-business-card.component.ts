import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseService } from '../service/data-base.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-edit-business-card",
  templateUrl: "./edit-business-card.component.html",
  styleUrls: ["./edit-business-card.component.css"]
})
export class EditBusinessCardComponent implements OnInit {
  cid: string;
  cardForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataBaseService: DataBaseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cid = this.route.snapshot.paramMap.get("cid");
    this.cardForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: [""],
      info: [""]
    });
    this.dataBaseService.getBusinessCard(this.cid).subscribe(item => {
      if (item) {
        const data = item.payload.data();
        console.log(data);
        this.cardForm.setValue(data);
      }
    });

  }

  onSubmit() {
    if (!this.cardForm.invalid) {
      const card = this.cardForm.value;
      this.dataBaseService
        .updateBusinessCard(this.cid, card)
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
