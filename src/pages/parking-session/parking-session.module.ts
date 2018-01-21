import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkingSessionPage } from './parking-session';

@NgModule({
  declarations: [
    ParkingSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkingSessionPage),
  ],
})
export class ParkingSessionPageModule {}
