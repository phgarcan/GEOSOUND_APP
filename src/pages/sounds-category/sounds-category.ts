import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';

const SOUNDSBYID_URL = `${config.apiUrl}/api/category`

@Component({
  selector: 'page-sounds-category',
  templateUrl: 'sounds-category.html',
})

export class SoundsCategoryPage {

  sounds:any
  idSound:any

  constructor(private auth: AuthProvider, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.idSound = this.navParams.data;
  }

  ionViewDidLoad() {
    this.http.get(SOUNDSBYID_URL+"/"+this.idSound+"/sounds").subscribe(sounds => {
      this.sounds = sounds;
    });
  }

}
