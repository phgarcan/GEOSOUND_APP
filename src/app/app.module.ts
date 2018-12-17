import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { BrowseSoundsPage } from '../pages/browse-sounds/browse-sounds';
import { RecordSoundPage } from '../pages/record-sound/record-sound';
import { SoundsMapPage } from '../pages/sounds-map/sounds-map';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';

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
    IonicStorageModule.forRoot()
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true }
  ]
})
export class AppModule {}
