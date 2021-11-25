import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AppService } from "./app.service";
import { DeleteComponent } from "./delete/delete.component";
import { EditComponent } from "./edit/edit.component";
import { ViewComponent } from "./view/view.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  displayedColumns: string[] = [
    "sno",
    "labname",
    "contactname",
    "contactnopri",
    "email",
    "action",
  ];

  dataSource = new MatTableDataSource([]);

  editMethod(id) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: "80%",
      disableClose: true,
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.commonMethod();
      }
    });
  }

  viewMethod(id) {
    const dialogRef = this.dialog.open(ViewComponent, {
      width: "80%",
      disableClose: true,
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
      }
    });
  }

  deleteMethod(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: "500px",
      disableClose: true,
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.commonMethod();
      }
    });
  }

  commonMethod() {
    this.appService.getAllLabs().subscribe(
      (res) => {
        let data: any = res;
        data.forEach((_element, index) => {
          data[index].sno = index + 1;
        });
        this.dataSource = new MatTableDataSource(data);
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  createLab() {
    const dialogRef = this.dialog.open(EditComponent, {
      width: "80%",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.commonMethod();
      }
    });
  }

  constructor(public dialog: MatDialog, private appService: AppService) {}

  ngOnInit() {
    this.commonMethod();
  }
}
