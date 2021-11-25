import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppService } from "../app.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  countries;
  states;
  cities;
  labForm = this.fb.group({
    labname: [this.data?.labname || "", Validators.required],
    email: [this.data?.email || ""],
    gstno: [this.data?.gstno || ""],
    country: [this.data?.country || ""],
    area: [this.data?.area || ""],
    contactname: [this.data?.contactname || ""],
    websiteurl: [this.data?.websiteurl || ""],
    serviceathome: [this.data?.serviceathome || ""],
    state: [this.data?.state || ""],
    landmark: [this.data?.landmark || ""],
    contactnopri: [this.data?.contactnopri || ""],
    registerno: [this.data?.registerno || ""],
    labservices: [this.data?.labservices || ""],
    city: [this.data?.city || ""],
    contactnosec: [this.data?.contactnosec || ""],
    panno: [this.data?.panno || ""],
    packagecost: [this.data?.packagecost || ""],
    pincode: [this.data?.pincode || ""],
  });

  onSubmit() {
    if (this.data?.id) {
      this.appService.updateLab(this.labForm.value, this.data.id).subscribe(
        (res) => {
          this.dialogRef.close(true);
        },
        (err) => {
          console.log("err", err);
        }
      );
    } else {
      this.appService.createLab(this.labForm.value).subscribe(
        (res) => {
          this.dialogRef.close(true);
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
  }

  loadState(country) {
    this.appService.getStates(country).subscribe(
      (res) => {
        this.states = res;
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  loadCity(country, state) {
    this.appService.getCities(country, state).subscribe(
      (res) => {
        this.cities = res;
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    if (this.data?.id) {
      this.appService.getLabById(this.data.id).subscribe(
        (res) => {
          let { _id, __v, ...val } = res;
          this.labForm.setValue(val);
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
    this.appService.getCountries().subscribe(
      (res) => {
        this.countries = res;
      },
      (err) => {
        console.log("err", err);
      }
    );
  }
}
