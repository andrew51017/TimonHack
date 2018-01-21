import { Component, ViewChild  } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import {
  GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng, Marker,
  MarkerOptions
} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;

  constructor(public navCtrl: NavController, public googleMaps: GoogleMaps, public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let locationOptions = {timeout: 10000, enableHighAccuracy: false};

    this.geolocation.getCurrentPosition(locationOptions).then((resp) => {

      this.map = this.googleMaps.create('map_canvas');
      this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

        let coordinates: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);

        let position = {
          target: coordinates,
          zoom: 17
        };

        this.map.animateCamera(position);

        let markerOptions: MarkerOptions = {
          position: coordinates,
          icon: "assets/images/icons8-Marker-64.png",
          title: 'Our first POI'
        };

        const marker = this.map.addMarker(markerOptions)
          .then((marker: Marker) => {
            marker.showInfoWindow();
          });

      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }


}
