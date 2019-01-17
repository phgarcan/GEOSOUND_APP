import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { latLng, Map, MapOptions, marker, markerClusterGroup, MarkerClusterGroup, tileLayer } from 'leaflet';
import 'leaflet.markercluster';
import { config } from '../../app/config';
import { Sound } from '../../models/sound';
import { DisplaySoundDetailsPage } from '../display-sound-details/display-sound-details';
import { s } from '@angular/core/src/render3';

const SOUND_URL = `${config.apiUrl}/api/sound`

@Component({
  selector: 'page-sounds-map',
  templateUrl: 'sounds-map.html'
})

export class SoundsMapPage {
  mapOptions: MapOptions
  map: Map
  mapMarkers: MarkerClusterGroup[]
  sounds: Array<Sound>

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

    const tileLayerOptions = {
      maxZoom: 20
    };

    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoomControl: false,
      attributionControl: false,
      zoom: 7,
      center: latLng(46.778186, 6.641524)
    };

    this.mapMarkers = []
  }

  /**
   * Load when map has finished to load
   * @param map 
   */
  onMapReady(map: Map) {
    this.map = map;
  }

  /**
   * can search sound on the map
   * @param e 
   */
  search(e: any) {

    this.mapMarkers = []
    let searchString = e.target.value

    let filteredSounds = this.sounds.filter((sound) => {
      if (!sound.description) {
        return false
      }

      return sound.description.includes(searchString)
    })

    let clusterMarker = markerClusterGroup()

    filteredSounds.forEach((sound) => {
      clusterMarker.addLayer(this.createSoundMarker(sound))
    })

    this.mapMarkers.push(clusterMarker)
  }

  /**
   * 
   */
  async ionViewDidLoad() {
    console.log('ionViewDidLoad SoundsMapPage')

    try {
      const position = await this.geolocation.getCurrentPosition();
      const coords = position.coords;
      this.map.setView(latLng(coords.latitude, coords.longitude), 10)

      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    } catch (err) {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    }

  }

  /**
   * 
   */
  ionViewWillEnter() {
    this.mapMarkers = []
    console.log(this.navCtrl.getPrevious())
    this.http.get(SOUND_URL + "?page=1&pageSize=100").subscribe((sounds: any) => {
      let clusterMarker = markerClusterGroup()
      console.log('test')

      this.sounds = sounds

      sounds.forEach(sound => {
        clusterMarker.addLayer(this.createSoundMarker(sound));
      });

      this.mapMarkers.push(clusterMarker)
    });
  }

  /**
   * Used to reset map (fix grey map bug)
   */
  ionViewDidEnter() {
    this.map.invalidateSize();
  }
  /**
   * display detailed information on the sound
   * @param soundId 
   */
  showSoundDetails(soundId: string) {
    this.navCtrl.push(DisplaySoundDetailsPage, { id: soundId });
  }

  /**
   * 
   * @param sound 
   */
  createSoundMarker(sound: any) {
    let soundMarker = marker([sound.coordinate.loc.x, sound.coordinate.loc.y])

    soundMarker.on('click', (e) => {
      this.showSoundDetails(sound._id)
    })

    return soundMarker
  }

}
