import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowseSoundsPage } from '../pages/browse-sounds/browse-sounds';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RecordSoundPage } from '../pages/record-sound/record-sound';
import { SoundsMapPage } from '../pages/sounds-map/sounds-map';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { AuthProvider } from '../providers/auth/auth';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BrowseSoundsPage,
    RecordSoundPage,
    SoundsMapPage,
    LoginPage
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
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true },
    Geolocation
  ]
})
export class AppModule {}
