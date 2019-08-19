import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  watchId;
  geoLoc;

  showLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    alert("Latitude: " + latitude + " Longitude: " + longitude);
  }

  errorHandler(err) {
    if (err.code == 1) {
      alert("Error: Acesso negado!");
    } else if (err.code == 2) {
      alert("Error: Posição indisponível!");
    }
  }

  getLocationUpdate() {
    if (navigator.geolocation) {
      let options = { timeout: 100000 };
      this.geoLoc = navigator.geolocation;
      this.watchId = this.geoLoc.watchPosition(this.showLocation, this.errorHandler, options)
    } else {
      alert("Browser não suporta geolocalização!");
    }
  }
}
