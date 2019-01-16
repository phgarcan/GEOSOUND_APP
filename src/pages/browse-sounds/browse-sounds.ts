import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { SoundsCategoryPage } from '../sounds-category/sounds-category';

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

  categories:any

  constructor(private auth: AuthProvider,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseSoundsPage');
    this.http.get(CATEGORY_URL).subscribe(categories => {
      this.categories = categories;
    });
  }

  goToCategory(id){
    this.navCtrl.push(SoundsCategoryPage, id);
  }

  
  logOut() {
    this.auth.logOut();
  }

}