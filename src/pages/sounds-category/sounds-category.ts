import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { config } from '../../app/config';
import { AuthProvider } from '../../providers/auth/auth';
import { DisplaySoundDetailsPage } from '../display-sound-details/display-sound-details';

const CATEGORY_URL = `${config.apiUrl}/api/category`;
const SOUND_URL = `${config.apiUrl}/api/sound`

@Component({
  selector: 'page-sounds-category',
  templateUrl: 'sounds-category.html',
})

export class SoundsCategoryPage {

  sounds: any
  idCategory: any
  categoryName: any

  constructor(private auth: AuthProvider,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.idCategory = this.navParams.data.id;
    this.categoryName = this.navParams.data.categoryName;
  }

  ionViewDidLoad() {
    if (this.idCategory == 0) {
      this.http.get(SOUND_URL + "/user").subscribe((results: any) => {

      })
    } else {
      this.http.get(CATEGORY_URL + "/" + this.idCategory + "/sounds").subscribe(sounds => {
        this.sounds = sounds;
      });
    }


  }


  goToDetails(id) {
    this.navCtrl.push(DisplaySoundDetailsPage, { id: id });
  }
}
