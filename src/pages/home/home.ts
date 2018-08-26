import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Login } from '../login/login';
import * as firebase from 'Firebase';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public app: App, 
    private facebook:Facebook,
    private googlePlus: GooglePlus) {
  }

  ionViewDidLoad() {
    // ログイン中かどうか確認
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        this.navCtrl.push(Login);
      }
    });
  }

  logout(){

    firebase.auth().signOut()
      .then(_ => {
        // ログイン画面に戻る
        const root = this.app.getRootNav();
        root.popToRoot();
      
      }, err => {
      // エラーを表示する等
    });

    // Facebookログアウト
    this.facebook.logout()
    .then( res => this.app.getRootNav().popToRoot() )
    .catch(e => console.log('Error logout from Facebook', e));

    this.googlePlus.logout()
    .then( res => this.app.getRootNav().popToRoot() )
    .catch(e => console.log('Error logout from Facebook', e));
  }

}
