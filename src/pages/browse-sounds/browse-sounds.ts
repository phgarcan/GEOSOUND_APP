import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { config } from '../../app/config';
import { AuthProvider } from '../../providers/auth/auth';

const CATEGORY_URL = `${config.apiUrl}/api/category`

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
