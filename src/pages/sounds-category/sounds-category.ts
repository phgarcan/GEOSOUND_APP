import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { DisplaySoundDetailsPage } from '../display-sound-details/display-sound-details'

const SOUNDSBYID_URL = `${config.apiUrl}/api/category`;

@Component({
  selector: 'page-sounds-category',
  templateUrl: 'sounds-category.html',
})

export class SoundsCategoryPage {

  sounds: any
  idSound: any
  categoryName: any

  constructor(private auth: AuthProvider,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.idSound = this.navParams.data.id;
    this.categoryName = this.navParams.data.categoryName;
  }

  ionViewDidLoad() {
    this.http.get(SOUNDSBYID_URL + "/" + this.idSound + "/sounds").subscribe(sounds => {
      this.sounds = sounds;
    });
  }

  goToDetails(id) {
    this.navCtrl.push(DisplaySoundDetailsPage, { id: id });
  }
}
