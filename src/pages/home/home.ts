import { Component, ViewChild  } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import {
  GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng, Marker,
  MarkerOptions
} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import {IBeacon, IBeaconDelegate, Region} from "@ionic-native/ibeacon";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  delegate: IBeaconDelegate;

  region: Region;

  constructor(public navCtrl: NavController, public googleMaps: GoogleMaps, public geolocation: Geolocation, public iBeacon: IBeacon) {

  }

  ionViewDidLoad() {
    this.loadMap();
    this.monitorBeacons();

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

  monitorBeacons() {

    // Request permission to use location on iOS
    this.iBeacon.requestAlwaysAuthorization();

// create a new delegate and register it with the native layer
    this.delegate = this.iBeacon.Delegate();

    // Subscribe to some of the delegate’s event handlers
    this.delegate.didRangeBeaconsInRegion().subscribe(data => {

      console.log(data);

    });

    // setup a beacon region – CHANGE THIS TO YOUR OWN UUID
    this.region = this.iBeacon.BeaconRegion('deskBeacon', 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961');

    // start ranging
    this.iBeacon.startRangingBeaconsInRegion(this.region).then(data => {
      console.log("Ranging started");
    });

  }

}
