import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {APP_CONFIG, IApplicationSettings} from "../../configuration/applicationsettings";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  username: string;

  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, @Inject(APP_CONFIG) public config: IApplicationSettings) {

    this.username = "test@test.com";
    this.password = "secret";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  doLogin() {

    this.http.post(this.config.API_ENDPOINT + "/token", {"email": this.username, "password" : this.password})
      .map(res => res.json())
      .subscribe(data => {

        this.config.CURRENT_TOKEN = data.token;

        this.navCtrl.push(HomePage, {
          token: data.token
        });

      });

  }

}
