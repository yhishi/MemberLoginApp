import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Welcome } from '../pages/welcome/welcome';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBgwhv9eXnVur0QMeR2_C8DIzGUK2th0iE',
  authDomain: 'memberapp-5f95d.firebaseapp.com',
  databaseURL: 'https://memberapp-5f95d.firebaseio.com',
  projectId: 'memberapp-5f95d',
  storageBucket: 'memberapp-5f95d.appspot.com',
  messagingSenderId: '143845184562'
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Welcome;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}
