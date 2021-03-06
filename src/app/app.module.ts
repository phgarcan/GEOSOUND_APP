import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { Media } from '@ionic-native/media';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AddSoundPage } from '../pages/add-sound/add-sound';
import { BrowseSoundsPage } from '../pages/browse-sounds/browse-sounds';
import { DisplaySoundDetailsPage } from '../pages/display-sound-details/display-sound-details';
import { EditSoundPage } from "../pages/edit-sound/edit-sound";
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RecordSoundPage } from '../pages/record-sound/record-sound';
import { ValidateEqualDirective } from "../pages/register/passwordValidatorDirective";
import { Register } from "../pages/register/register";
import { SoundsCategoryPage } from '../pages/sounds-category/sounds-category';
import { SoundsMapPage } from '../pages/sounds-map/sounds-map';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { AuthProvider } from '../providers/auth/auth';
import { RegistrationProvider } from "../providers/register/register";
import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BrowseSoundsPage,
    SoundsCategoryPage,
    RecordSoundPage,
    SoundsMapPage,
    LoginPage,
    AddSoundPage,
    DisplaySoundDetailsPage,
    Register,
    ValidateEqualDirective,
    EditSoundPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LeafletModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BrowseSoundsPage,
    RecordSoundPage,
    SoundsMapPage,
    LoginPage,
    SoundsCategoryPage,
    AddSoundPage,
    DisplaySoundDetailsPage,
    Register,
    EditSoundPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true },
    Geolocation,
    NativeGeocoder,
    Media,
    File,
    Base64,
    RegistrationProvider
  ]
})
export class AppModule { }
