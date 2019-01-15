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

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;

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

    this.recording = true;

    this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';

    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    } else {
      // this section is used for testing app in development
      this.fileName = 'sound.mp3'
      this.filePath = 'file:///C:/Users/Arthur/Downloads' + this.fileName
      return
    }

    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
  }

  /**
   * 
   */
  stopRecord() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.audio.stopRecord();
    }

    this.recording = false;

    this.navCtrl.push(AddSoundPage, { filePath: this.filePath, fileName: this.fileName })

  }

  /**
   * 
   */
  cancelRecord() {
    this.recording = false

    if (this.platform.is('ios') || this.platform.is('android')) {
      this.audio.stopRecord();
    }
  }

  ionViewWillEnter() {
    this.getAudioList();
  }

  startRecord() {
    console.log('wejiop');
    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      console.log('wejiop 2');
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = {filename: this.fileName};
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file, idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }
}
