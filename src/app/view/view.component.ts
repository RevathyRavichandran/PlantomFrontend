import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppService } from "../app.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"],
})
export class ViewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.appService.getLabById(this.data.id).subscribe(
      (res) => {
        this.data = res;
      },
      (err) => {
        console.log("err", err);
      }
    );
  }
}
