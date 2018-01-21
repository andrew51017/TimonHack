import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeaconPopupPage } from './beacon-popup';

@NgModule({
  declarations: [
    BeaconPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(BeaconPopupPage),
  ],
})
export class BeaconPopupPageModule {}
