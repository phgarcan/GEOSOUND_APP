import { Category } from "./category";
import { NativeGeocoder } from '@ionic-native/native-geocoder';

class Location {
    x: number
    y: number
}

class Coordinate {
    city: string
    loc: Location
}


export class Sound {
    _id: number
    categories: Array<Category>
    coordinate: Coordinate
    description: string
    quality: string
    sound: string
    user: string

    /**
     * Geocode the position with the long and lat
     * @param cityName 
     */
    static async geocodeCity(cityName: string) {
        try {
            let nativeGeocoder = new NativeGeocoder()
            let coordinate = await nativeGeocoder.forwardGeocode(cityName, {
                useLocale: true,
                maxResults: 1
            })


            return { coords: { latitude: coordinate[0].latitude, longitude: coordinate[0].longitude } }

        } catch (err) {
            console.log(err)
            return { coords: { latitude: 0, longitude: 0 } }
        }
    }

    /**
     * Geocode the position with the city name
     * @param lat 
     * @param long 
     */
    static async getCityFromCoords(lat: number, long: number) {

        try {
            let nativeGeocoder = new NativeGeocoder()

            let city = await nativeGeocoder.reverseGeocode(lat, long, {
                useLocale: true,
                maxResults: 1
            })[0]

            return city
        } catch (err) {
            console.log(err)
            return ''
        }
    }
}