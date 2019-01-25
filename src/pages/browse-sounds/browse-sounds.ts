import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { config } from '../../app/config';
import { AuthProvider } from '../../providers/auth/auth';
import { SoundsCategoryPage } from '../sounds-category/sounds-category';

const CATEGORY_URL = `${config.apiUrl}/api/category`
const SOUND_URL = `${config.apiUrl}/api/sound`

@Component({
  selector: 'page-browse-sounds',
  templateUrl: 'browse-sounds.html',
})

export class BrowseSoundsPage {

  categoriesWithNbSounds: any[]

  constructor(private auth: AuthProvider,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.categoriesWithNbSounds = []
  }

  ionViewWillEnter() {
    this.categoriesWithNbSounds = []

    this.http.get(SOUND_URL+"/user").subscribe((results: any) => {
      
      this.categoriesWithNbSounds.push({ categoryID: 0, categoryName: 'My Sounds', nbSound: results.length })
    })

    this.http.get(CATEGORY_URL).subscribe((categories: any[]) => {
      categories.forEach((category) => {
        this.http.get(CATEGORY_URL + "/" + category._id + "/sounds").subscribe((results: any) => {
          this.categoriesWithNbSounds.push({ categoryID: category._id, categoryName: category.name, nbSound: results.length })
        });
      })
    });
  }

  goToCategory(id, categoryName) {
    this.navCtrl.push(SoundsCategoryPage, {id, categoryName});
  }


  logOut() {
    this.auth.logOut();
  }

}
