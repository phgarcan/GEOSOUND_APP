import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { config } from '../../app/config';
import { Category } from '../../models/category';

const CATEGORY_URL = `${config.apiUrl}/api/category`
const SOUND_URL = `${config.apiUrl}/api/sound`

@Component({
  selector: 'page-add-sound',
  templateUrl: 'add-sound.html',
})

export class AddSoundPage {
  fileName: string
  filePath: string
  categories: Array<Category>
  form_categories: Array<Category>
  form_quality: string
  form_description: string
  form_city: string
  position: any

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
    private base64: Base64,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {

    if (!this.navParams.data.fileName ||
      !this.navParams.data.filePath) {
      throw new Error("No file in params")
    }

    this.fileName = this.navParams.data.fileName
    this.filePath = this.navParams.data.filePath
  }

  /**
   * 
   */
  async ionViewDidLoad() {
    console.log('ionViewDidLoad AddSoundPage');

    this.http.get<Category[]>(CATEGORY_URL).subscribe(categories => {
      console.log(categories)
      this.categories = categories
    });

    try {
      let position = await this.geolocation.getCurrentPosition();
      this.position = position;
      console.log(position)
    } catch (err) {
      this.position = null
      console.warn(`Could not retrieve user position because: ${err.message}`);
    }
  }

  /**
   * Save a sound on the API
   */
  async save() {
    console.log(this.filePath)
    console.log(this.form_description, this.form_quality, this.form_categories)

    if (this.platform.is('ios') || this.platform.is('android')) {
      this.base64.encodeFile(this.filePath).then(async (base64File: string) => {

        let city = ''


        // Geocode the position with the city name
        if (this.position != null) {
          try {
            city = await this.nativeGeocoder.reverseGeocode(this.position.coords.latitude, this.position.coords.longitude, {
              useLocale: true,
              maxResults: 1
            })[0]
            console.log(city)
          } catch (err) {
            console.log(err)
            return
          }
        }
        // Geocode the position with the long and lat
        else {
          city = this.form_city
          try {
            let coordinate = await this.nativeGeocoder.forwardGeocode(this.form_city, {
              useLocale: true,
              maxResults: 1
            })
          
                        
            this.position = { coords: { latitude: coordinate[0].latitude, longitude: coordinate[0].longitude } }
          
          } catch (err) {
            console.log(err)
            return
          }
        }

        console.log(this.position)

        let soundToSave = {
          sound: base64File,
          categories: this.form_categories,
          coordinate: { "city": city, "loc": { "x": this.position.coords.latitude, "y": this.position.coords.longitude } },
          description: this.form_description,
          quality: this.form_quality
        }

        this.http.post(SOUND_URL, soundToSave).subscribe(response => {
          console.log(response)
          this.navCtrl.pop()
        }, (err: HttpErrorResponse) => {
          console.log(err)
          throw err
        })

      }, (err) => {
        console.log("Error with base64 encode : ", err);
      });
    }


  }

  /**
   * 
   */
  cancelSave() {
    this.navCtrl.pop()
  }

}
