import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { config } from '../../app/config';
import { Category } from '../../models/category';
import { Sound } from '../../models/sound';

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
  audio: MediaObject
  isPlaying: boolean

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
    private media: Media) {

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

    if (this.platform.is('ios') || this.platform.is('android')) {

      let base64File
      try {
        base64File = await this.file.readAsDataURL(this.filePath, this.fileName)
      } catch (err) {
        console.log(err)
        base64File = ''
      }

      // GEOCODE POSITION
      let city = this.form_city

      if (this.position != null) {
        city = await Sound.getCityFromCoords(this.position.coords.latitude, this.position.coords.longitude)
      } else {
        this.position = await Sound.geocodeCity(this.form_city)
      }

      // CREATE SOUND IN JSON
      let soundToSave = {
        sound: base64File,
        categories: this.form_categories,
        coordinate: { "city": city, "loc": { "x": this.position.coords.latitude, "y": this.position.coords.longitude } },
        description: this.form_description,
        quality: this.form_quality
      }

      // REQUEST TO SERVER
      this.http.post(SOUND_URL, soundToSave).subscribe(response => {
        console.log(response)
        this.navCtrl.pop()
      }, (err: HttpErrorResponse) => {
        console.log(err)
        throw err
      })
    }
  }

  /**
   * Play the sound
   */
  playSound() {
    if (this.audio) {
      this.audio.stop()
      this.audio.release()
    }

    console.log()
    this.audio = this.media.create(this.filePath + this.fileName);
    this.isPlaying = true
    this.audio.play()
  }

  /**
   * Stop the playing of the sound
   */
  stopSound() {
    if (this.isPlaying) {
      this.audio.stop()
      this.audio.release()
    }
  }

  /**
   * 
   */
  cancelSave() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop().catch((error) => { console.log(error) })
    }


  }

}
