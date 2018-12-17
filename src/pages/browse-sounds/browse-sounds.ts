import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';

const CATEGORY_URL = `${config.apiUrl}/api/category`

/**
 * Generated class for the BrowseSoundsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-browse-sounds',
  templateUrl: 'browse-sounds.html',
})
export class BrowseSoundsPage {

  constructor(private auth: AuthProvider,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseSoundsPage');
    this.http.get(CATEGORY_URL).subscribe(categories => {
      console.log(`Categories loaded`, categories);
    });
  }

  logOut() {
    this.auth.logOut();
  }

}
