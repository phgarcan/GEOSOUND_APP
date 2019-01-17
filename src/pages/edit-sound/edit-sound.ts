import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {File} from '@ionic-native/file';
import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {config} from '../../app/config';
import {Category} from '../../models/category';
import {Sound} from '../../models/sound';

const CATEGORY_URL = `${config.apiUrl}/api/category`
const SOUND_URL = `${config.apiUrl}/api/sound/`

@Component({
  selector: 'page-edit-sound',
  templateUrl: 'edit-sound.html',
})

export class EditSoundPage {
  editedSound: Sound
  categories: Array<Category>

  /**
   *
   * @param navCtrl
   * @param navParams
   * @param file
   * @param platform
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    public platform: Platform,
    public http: HttpClient,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
  ) {
    this.editedSound = navParams.get('sound')
  }

  /**
   *
   */
  async ionViewDidLoad() {
    console.log('ionViewDidLoad EditSoundPage');

    this.http.get<Category[]>(CATEGORY_URL).subscribe(categories => {
      console.log(categories)
      this.categories = categories
    });
  }

  /**
   * Update a sound on the API
   */
  async save() {

    // REQUEST TO SERVER
    this.http.put(SOUND_URL+ this.editedSound._id, this.editedSound).subscribe(response => {

      this.navCtrl.pop()
    }, (err: HttpErrorResponse) => {

      throw err
    })
  }


  /**
   *
   */
  cancelSave() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop().catch((error) => {
        console.log(error)
      })
    }
  }

}
