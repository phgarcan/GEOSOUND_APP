import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { config } from '../../app/config';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { Sound } from '../../models/sound';

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

  sound: Sound
  user: User
  auth: User

  /**
   * Constructor
   * @param navCtrl 
   * @param navParams 
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage) {

    this.sound = new Sound()
    this.user = new User()
    this.auth = new User()
    

    this.storage.get('auth').then(e => {
      console.log(e)
      this.auth = e.user
    })

    //console.log(this.navParams.data)

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
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplaySoundDetailsPage');
  }

}
