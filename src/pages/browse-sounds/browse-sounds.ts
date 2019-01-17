import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { SoundsCategoryPage } from '../sounds-category/sounds-category';
const CATEGORY_URL = `${config.apiUrl}/api/category`

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseSoundsPage');
    this.http.get(CATEGORY_URL).subscribe((categories:any[]) => {      
      categories.forEach((category)=> {
        this.http.get(CATEGORY_URL + "/" + category._id + "/sounds").subscribe((results:any) => {
          this.categoriesWithNbSounds.push({categoryID:category._id,categoryName:category.name, nbSound:results.length})
        });

      })
      
    });
    //this.categoriesWithNbSounds = categoriesWithNbSounds;
    //console.log(categoriesWithNbSounds)
  }

  goToCategory(id, categoryName) {
    this.navCtrl.push(SoundsCategoryPage, { id, categoryName });
  }


  logOut() {
    this.auth.logOut();
  }

}