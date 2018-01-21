import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import {IBeacon} from "@ionic-native/ibeacon";

import { APP_CONFIG, ApplicationSettings } from '../configuration/applicationsettings';
import {LoginRegisterPage} from "../pages/login-register/login-register";
import {HttpModule} from "@angular/http";
import {BeaconPopupPage} from "../pages/beacon-popup/beacon-popup";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BeaconPopupPage,
    LoginRegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BeaconPopupPage,
    ListPage,
    LoginRegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    Geolocation,
    IBeacon,
    {provide: APP_CONFIG, useValue: ApplicationSettings }
  ]
})
export class AppModule {}
