import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private facebook: Facebook,
    private googleplus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
    // Facebookにログイン中かどうか確認
    this.facebook.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connect") {
          alert("isLoggedIn")
        } else {
          alert("isLoggedOut")
        }
      })
      .catch(e => console.log(e));
  }

  loginEmail(){
   this.navCtrl.push(Login);
  }

  signUp(){
   this.navCtrl.push(Signup, {}, {animate:false});
  }

  loginFacebook(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            alert("Firebase success: " + JSON.stringify(success)); 
            this.navCtrl.push(TabsPage);
          });

      }).catch((error) => { console.log(error) });
  }

}
