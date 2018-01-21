import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Http} from "@angular/http";
import {APP_CONFIG, IApplicationSettings} from "../../configuration/applicationsettings";

/**
 * Generated class for the BeaconPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beacon-popup',
  templateUrl: 'beacon-popup.html',
})
export class BeaconPopupPage {

  carPark : any;

  constructor(public http: Http, @Inject(APP_CONFIG) public config: IApplicationSettings, public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {

    this.carPark = navParams.get("carPark");
    (this.http as any)._defaultOptions.headers.append('Authorization', 'Bearer ' + this.config.CURRENT_TOKEN);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeaconPopupPage');
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  onStart() {
    this.viewCtrl.dismiss();

    this.http.post(this.config.API_ENDPOINT + "/start/" + this.carPark.id, {})
      .map(res => res.json())
      .subscribe(data => {

        this.viewCtrl.dismiss();

      });

  }

}
