
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {config} from '../../app/config';
import {Storage} from '@ionic/storage';
import {User} from '../../models/user';
import {Sound} from '../../models/sound';
import {EditSoundPage} from "../edit-sound/edit-sound";
import {LoginPage} from "../login/login";
import {AlertController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { config } from '../../app/config';
import { Sound } from '../../models/sound';
import { User } from '../../models/user';

const SOUND_URL = `${config.apiUrl}/api/sound/`
const USER_URL = `${config.apiUrl}/api/user/`

@Component({
  selector: 'page-display-sound-details',
  templateUrl: 'display-sound-details.html',
})

/**
 *
 */
export class DisplaySoundDetailsPage {

  editSoundPage = EditSoundPage

  sound: Sound
  user: User
  auth: User
  audio: MediaObject
  isPlaying: boolean

  /**
   * Constructor
   * @param navCtrl
   * @param navParams
   */
  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage,
    private file: File,
    private media: Media) {

    this.sound = new Sound()
    this.user = new User()
    this.auth = new User()


    this.storage.get('auth').then(e => {
      console.log(e)
      this.auth = e.user
    })

  }

  /**
   * Play the sound
   */
  async playSound() {
    if (this.audio) {
      this.audio.stop()
      this.audio.release()
    }

    try {

      let base64Header = this.sound.sound
      let base64Sound = base64Header.split(';base64,').pop();

      await this.file.writeFile(this.file.dataDirectory, 'tmp.3gp',
        this.b64toBlob(base64Sound, 'audio/3gpp2'),
        { replace: true })


      this.audio = this.media.create(this.file.dataDirectory + 'tmp.3gp');
      this.isPlaying = true
      this.audio.play()

    } catch (err) {
      console.log(err)
    }
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
   * Function used to encode base64 to Blob object
   * src : https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
   * @param b64Data 
   * @param contentType 
   */
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  /**
   *
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplaySoundDetailsPage');
  }


  /**
   * Method use when the page is about to enter and become the active page.
   */
  ionViewWillEnter() {
    if (!this.navParams.data.id) {
      throw new Error("No id set for the sound")
    }

    // Load sound from API
    this.http.get(SOUND_URL + this.navParams.data.id).subscribe((sound: any) => {
      console.log(`sound loaded`, sound)
      this.sound = sound

      // Load user from API
      this.http.get(USER_URL + sound.user).subscribe((user: any) => {
        this.user = user
      })


    });
  }

  /**
   * Delete the soune
   */
  async delete() {

    // REQUEST TO SERVER
    this.http.delete(SOUND_URL + '/' + this.sound._id).subscribe(response => {
      let alert = this.alertCtrl.create({
        title: 'Sound Deleted',
        subTitle: 'The sound has been successfully deleted',
        buttons: [
          {
            text: 'OK',
            role: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
      });
      alert.present();
    }, (err: HttpErrorResponse) => {

      throw err
    })
  }
}
