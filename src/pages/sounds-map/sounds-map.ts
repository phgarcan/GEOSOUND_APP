import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { config } from '../../app/config';
import { DisplaySoundDetailsPage } from '../display-sound-details/display-sound-details';

const SOUND_URL = `${config.apiUrl}/api/sound`

@Component({
  selector: 'page-sounds-map',
  templateUrl: 'sounds-map.html'
})

export class SoundsMapPage {
  mapOptions: MapOptions
  map: Map
  mapMarkers: Marker[]

  /**
   * 
   * @param geolocation 
   * @param navCtrl 
   * @param navParams 
   */
  constructor(
    public http: HttpClient,
    private geolocation: Geolocation,
    public navCtrl: NavController,
    public navParams: NavParams) {

    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    const tileLayerOptions = { maxZoom: 13 };

    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 7,
      center: latLng(46.778186, 6.641524)
    };

    this.http.get(SOUND_URL + "?page=1&pageSize=100").subscribe((sounds: any) => {
      console.log(`sound loaded`, sounds);

      this.mapMarkers = []

      sounds.forEach(sound => {
        console.log(sound.coordinate.loc.x)
        
        let soundMarker = marker([sound.coordinate.loc.x, sound.coordinate.loc.y])

        soundMarker.on('click', (e)=>{
          this.showSoundDetails(sound._id)
        })

        this.mapMarkers.push(soundMarker)

        console.log(this.mapMarkers)
      });

    });

  }

  /**
   * Load when map has finished to load
   * @param map 
   */
  onMapReady(map: Map) {
    this.map = map;
  }

  /**
   * 
   */
  async ionViewDidLoad() {
    console.log('ionViewDidLoad SoundsMapPage')

    try {
      const position = await this.geolocation.getCurrentPosition();
      const coords = position.coords;
      this.map.setView(latLng(coords.latitude, coords.longitude), 13)

      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    } catch (err) {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    }

  }

  showSoundDetails(soundId: string) {
    this.navCtrl.push(DisplaySoundDetailsPage, { id: soundId });
  }

}
