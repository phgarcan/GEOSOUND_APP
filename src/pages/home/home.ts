import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BrowseSoundsPage } from '../browse-sounds/browse-sounds';
import { RecordSoundPage } from '../record-sound/record-sound';
import { SoundsMapPage } from '../sounds-map/sounds-map';


export interface HomePageTab {
  title: string;
  icon: string;
  component: Function;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  tabs: HomePageTab[];


  constructor(public navCtrl: NavController) {
    this.tabs = [
      { title: 'Browse sounds', icon: 'list', component: BrowseSoundsPage },
      { title: 'Map of sounds', icon: 'map', component: SoundsMapPage },
      { title: 'Record sound', icon: 'add', component: RecordSoundPage },
    ];
  }

}
