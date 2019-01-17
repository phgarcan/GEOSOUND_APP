import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AddSoundPage } from '../add-sound/add-sound';


@Component({
  selector: 'page-record-sound',
  templateUrl: 'record-sound.html',
})

export class RecordSoundPage {

  recording: boolean = false
  filePath: string
  fileName: string
  audio: MediaObject

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param media 
   * @param file 
   * @param platform 
   */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private media: Media,
    private file: File,
    public platform: Platform) {
  }

  /**
   * 
   */
  ionViewWillEnter() {

  }

  /**
   * 
   */
  startRecord() {

    this.recording = true

    this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp'

    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory
    } else {
      // this section is used for testing app in development
      this.fileName = 'sound.mp3'
      this.filePath = 'file:///C:/Users/Arthur/Downloads'
      return
    }

    this.audio = this.media.create(this.filePath + this.fileName)
    this.audio.startRecord()
  }

  /**
   * 
   */
  stopRecord() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.audio.stopRecord()
      this.audio.release()
    }

    this.recording = false

    this.navCtrl.push(AddSoundPage, { filePath: this.filePath, fileName: this.fileName })

  }

  /**
   * 
   */
  cancelRecord() {
    this.recording = false

    if (this.platform.is('ios') || this.platform.is('android')) {
      this.audio.stopRecord()
      this.audio.release()
    }
  }
}