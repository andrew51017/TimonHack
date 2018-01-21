import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from "@ionic-native/google-maps";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 54.582943,
          lng: -5.933810,
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map-canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

}
