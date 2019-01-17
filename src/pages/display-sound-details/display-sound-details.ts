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
    private storage: Storage) {

    this.sound = new Sound()
    this.user = new User()
    this.auth = new User()


    this.storage.get('auth').then(e => {
      console.log(e)
      this.auth = e.user
    })

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
