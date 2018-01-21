import {Component, Inject, ViewChild} from '@angular/core';
import {Platform, NavController, ModalController} from 'ionic-angular';
import {
  GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, LatLng, Marker,
  MarkerOptions
} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import {IBeacon, IBeaconDelegate, Region} from "@ionic-native/ibeacon";
import {LoginRegisterPage} from "../login-register/login-register";
import {Http} from "@angular/http";
import {APP_CONFIG, IApplicationSettings} from "../../configuration/applicationsettings";
import {BeaconPopupPage} from "../beacon-popup/beacon-popup";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  delegate: IBeaconDelegate;

  region: Region;

  hasShown: boolean

  constructor(public modalCtrl: ModalController, public http: Http, @Inject(APP_CONFIG) public config: IApplicationSettings, public navCtrl: NavController, public googleMaps: GoogleMaps, public geolocation: Geolocation, public iBeacon: IBeacon) {

  }

  ionViewDidLoad() {

    this.loadMap();

  }

  loadMap() {

    (this.http as any)._defaultOptions.headers.append('Authorization', 'Bearer ' + this.config.CURRENT_TOKEN);

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

        this.http.get(this.config.API_ENDPOINT + "/carparks").map(res => res.json())
        .subscribe(data => {

          for (var i = 0; i < data.length; i++) {

            var carPark = data[i];

            let carParkCoordinates: LatLng = new LatLng(carPark.geo_lat, carPark.geo_lng);

            let markerIcon = "assets/imgs/";

            if (carPark.has_beacon) {

              if (carPark.available_spaces > 0) {
                markerIcon += "M1.png";
              }
              else {
                markerIcon += "M5.png";
              }
            }
            else {
              markerIcon += "M9.png"
            }

            let markerOptions: MarkerOptions = {
              position: carParkCoordinates,
              icon: markerIcon,
              title: carPark.name + " (Total spaces: " + carPark.total_spaces + " )"
            };

            const marker = this.map.addMarker(markerOptions)
              .then((marker: Marker) => {
                marker.showInfoWindow();
              });

          }

        });

        this.monitorBeacons();

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

      if (data.beacons.length == 1 && !this.hasShown)
      {
        this.hasShown = true;

        console.log("Found beacon");
        console.log(data);

        var beacon = data.beacons[0];
        var major = beacon.major;
        var minor = beacon.minor;

        this.http.get(this.config.API_ENDPOINT + "/beacon?beacon_major=" + major + "&beacon_minor=" + minor)
          .map(res => res.json())
          .subscribe(data => {

            let modal = this.modalCtrl.create(BeaconPopupPage, {carPark: data});
            modal.present();

          });

      }

    });

    // setup a beacon region – CHANGE THIS TO YOUR OWN UUID
    this.region = this.iBeacon.BeaconRegion('deskBeacon', 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961');

    // start ranging
    this.iBeacon.startRangingBeaconsInRegion(this.region).then(data => {
      console.log("Ranging started");
    });

  }

}
