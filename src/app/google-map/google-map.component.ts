import { Component, NgZone, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core';
import { AppService } from '../app.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;
  value;

  mapReadyHandler(map: google.maps.Map): void {
    map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
        console.log(e.latLng.lat(), e.latLng.lng());
        this.lat = e.latLng.lat();
        this.lng = e.latLng.lng();
        this.appService.getAddress(this.lat, this.lng).subscribe(
          res => {
            console.log('res <<< ', res);
            this.value = "No.2, Sugarnadi complex, Nehru Nagar";
          }
        )
      });
    });
  }

  submit() {
    this.dialogRef.close(this.value);
  }

  constructor(private zone: NgZone, private appService: AppService, public dialogRef: MatDialogRef<GoogleMapComponent>) { }

  ngOnInit(): void {
  }

}
