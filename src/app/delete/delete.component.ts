import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppService } from "../app.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.css"],
})
export class DeleteComponent implements OnInit {
  onNoClick(): void {
    this.dialogRef.close();
  }

  ok(): void {
    this.appService.deleteLabById(this.data.id).subscribe(
      (res) => {
        this.dialogRef.close(true);
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ) {}

  ngOnInit(): void {}
}
