import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // watchId;
  // geoLoc;

  // showLocation(position) {
  //   let latitude = position.coords.latitude;
  //   let longitude = position.coords.longitude;
  //   alert("Latitude: " + latitude + " Longitude: " + longitude);
  // }

  // errorHandler(err) {
  //   if (err.code == 1) {
  //     alert("Error: Acesso negado!");
  //   } else if (err.code == 2) {
  //     alert("Error: Posição indisponível!");
  //   }
  // }

  // getLocationUpdate() {
  //   if (navigator.geolocation) {
  //     let options = { timeout: 100000 };
  //     this.geoLoc = navigator.geolocation;
  //     this.watchId = this.geoLoc.watchPosition(this.showLocation, this.errorHandler, options)
  //   } else {
  //     alert("Browser não suporta geolocalização!");
  //   }
  // }

  private locationsSubscription: Subscription;
  latitude: number;
  longitude: number;

  ngOnInit() {
    const locations = Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.watchPosition(
          (position) => {
            observer.next(position)
          }, error => {
            observer.error(new Error(error.message));
          },
          { timeout: 60000 }
        );
      } else {
        observer.error(new Error('Browser não suporta!'));
      }
    });

    this.locationsSubscription = locations.subscribe(data => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    })
  }
}
