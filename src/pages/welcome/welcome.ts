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
    private googlePlus: GooglePlus) {
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

  signInWithFacebook(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            alert("signInWithFacebook success: " + JSON.stringify(success)); 
            this.navCtrl.push(TabsPage);
          });

      }).catch((error) => { console.log(error) });
  }

  signInWithGoogle(): void {
    this.googlePlus.login({
      'webClientId': '143845184562-7ikvi2kd1c1qrlmlgiglo7uo7gkfnjdf.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
            const googleCredential = firebase.auth.GoogleAuthProvider
                .credential(res.idToken);
   
            firebase.auth().signInWithCredential(googleCredential)
              .then( response => {
                alert("signInWithGoogle success: " + JSON.stringify(response)); 
                this.navCtrl.push(TabsPage);
              });
    }, err => {
        console.error("Error: ", err)
    });
  }

}
